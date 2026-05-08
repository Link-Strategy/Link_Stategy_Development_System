import fs from 'fs';
import path from 'path';
import { sha256 } from './fs-utils.mjs';
import {
    quicktype,
    InputData,
    JSONSchemaInput,
    FetchingJSONSchemaStore
} from "quicktype-core";

export async function castDna(runtime) {
    const root = process.cwd();
    const schemaDir = path.join(root, "assets", "contracts", "schema");
    const outputDir = path.join(root, "assets", "contracts", "generated");

    console.log("Starting Contract Generation (Lò Đúc Brain)...");

    if (!fs.existsSync(schemaDir)) {
        throw new Error(`Schema directory not found: ${schemaDir}`);
    }

    // Ensure output directories exist
    const languages = ["typescript", "dart", "python"];
    languages.forEach(lang => {
        const langDir = path.join(outputDir, lang);
        if (!fs.existsSync(langDir)) {
            fs.mkdirSync(langDir, { recursive: true });
        }
    });

    const schemaFiles = fs.readdirSync(schemaDir).filter(f => f.endsWith(".json"));
    const failures = [];

    for (const file of schemaFiles) {
        const schemaPath = path.join(schemaDir, file);
        const schemaName = path.parse(file).name;
        const typeName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
        const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
        const schemaHash = sha256(schemaContent.replace(/\r\n/g, "\n"));

        console.log(`Processing schema: ${file} -> Type: ${typeName}`);

        for (const lang of languages) {
            try {
                const result = await castModel(lang, typeName, schemaContent);
                const ext = getExtension(lang);
                const outputPath = path.join(outputDir, lang, `${schemaName}${ext}`);
                
                const generatedContent = postProcessGeneratedContent(lang, result.lines.join("\n"));
                const finalContent = addHeader(lang, generatedContent, file, schemaHash);
                fs.writeFileSync(outputPath, finalContent);
                if (lang === "typescript") {
                    fs.writeFileSync(path.join(outputDir, lang, `${schemaName}.d.ts`), finalContent);
                }
                console.log(`  [${lang}] Generated: ${path.relative(root, outputPath)}`);
            } catch (e) {
                failures.push(`  [${lang}] Error generating ${file}: ${e.message}`);
                console.error(failures.at(-1));
            }
        }
    }

    if (failures.length > 0) {
        throw new Error(`Contract generation failed:\n${failures.join("\n")}`);
    }

    updateContractMap(root, schemaFiles, outputDir);

    console.log("\nGeneration Complete. Assets are ready in assets/contracts/generated/");
}

function updateContractMap(root, schemaFiles, outputDir) {
    const mapPath = path.join(root, "assets", "contracts", "contract-map.json");
    let map = { last_updated: "", contracts: {} };

    if (fs.existsSync(mapPath)) {
        try {
            map = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
        } catch (e) {
            console.warn("Could not parse existing contract-map.json, creating new one.");
        }
    }

    map.last_updated = new Date().toISOString();
    map.contracts = {};
    map.apis = {};

    schemaFiles.forEach(file => {
        const schemaName = path.parse(file).name;
        map.contracts[schemaName] = {
            schema: `assets/contracts/schema/${file}`,
            generated: {
                typescript: `assets/contracts/generated/typescript/${schemaName}.ts`,
                typescript_declaration: `assets/contracts/generated/typescript/${schemaName}.d.ts`,
                dart: `assets/contracts/generated/dart/${schemaName}.dart`,
                python: `assets/contracts/generated/python/${schemaName}.py`
            }
        };
    });

    const apiDir = path.join(root, "assets", "contracts", "api");
    if (fs.existsSync(apiDir)) {
        const apiFiles = fs.readdirSync(apiDir).filter(f => f.endsWith(".yaml") || f.endsWith(".yml"));
        apiFiles.forEach(file => {
            const apiName = path.parse(file).name;
            const sanitized = apiName.split(/[-_]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
            map.apis[apiName] = {
                spec: `assets/contracts/api/${file}`
            };
        });
    }

    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
    console.log(`Updated Contract Map: ${path.relative(root, mapPath)}`);
}

async function castModel(targetLanguage, typeName, jsonSchemaString) {
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
    await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    return await quicktype({
        inputData,
        lang: targetLanguage,
        rendererOptions: getRendererOptions(targetLanguage)
    });
}

function getRendererOptions(lang) {
    if (lang === "typescript") {
        return { "just-types": "true" };
    }
    if (lang === "dart") {
        return { "generate-to-json": "true" };
    }
    return {};
}

function getExtension(lang) {
    switch (lang) {
        case "typescript": return ".ts";
        case "dart": return ".dart";
        case "python": return ".py";
        default: return ".txt";
    }
}

function postProcessGeneratedContent(lang, content) {
    if (lang !== "dart") return content;

    const optionalFields = new Set();
    for (const match of content.matchAll(/^\s+\w+\?\s+(\w+);$/gm)) {
        optionalFields.add(match[1]);
    }

    return content
        .replace(
            /(\s+)(\w+): Map\.from\(json\["([^"]+)"\]!\)\.map\(\(k, v\) => MapEntry<String, dynamic>\(k, v\)\),/g,
            '$1$2: json["$3"] == null ? null : Map.from(json["$3"]).map((k, v) => MapEntry<String, dynamic>(k, v)),'
        )
        .replace(
            /(\s+)"([^"]+)": Map\.from\((\w+)!\)\.map\(\(k, v\) => MapEntry<String, dynamic>\(k, v\)\),/g,
            '$1"$2": $3 == null ? null : Map.from($3!).map((k, v) => MapEntry<String, dynamic>(k, v)),'
        )
        .replace(
            /(\s+)(\w+): (\w+Values)\.map\[json\["([^"]+)"\]\]!,/g,
            (match, indent, field, valuesName, jsonKey) => {
                if (!optionalFields.has(field)) return match;
                return `${indent}${field}: json["${jsonKey}"] == null ? null : ${valuesName}.map[json["${jsonKey}"]]!,`;
            }
        )
        .replace(/^\s+$/gm, "");
}

function addHeader(lang, content, sourceFile, schemaHash) {
    const isPython = lang === "python";
    const header = isPython 
        ? `# [GENERATED ASSET] DO NOT EDIT MANUALLY\n# Source: assets/contracts/${sourceFile === "contract-map.json" ? "" : "schema/"}${sourceFile}\n# Source Hash: ${schemaHash}\n# Generated by Letron-Leos Sovereign Forge\n\n`
        : `/**\n * [GENERATED ASSET] DO NOT EDIT MANUALLY\n * Source: assets/contracts/${sourceFile === "contract-map.json" ? "" : "schema/"}${sourceFile}\n * Source Hash: ${schemaHash}\n * Generated by Letron-Leos Sovereign Forge\n */\n\n`;
    return header + content;
}
