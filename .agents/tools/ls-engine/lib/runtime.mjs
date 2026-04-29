import path from "node:path";

export function createRuntime(args, root = process.cwd()) {
  return {
    args,
    root,
    requireArg(name) {
      const value = args[name];
      if (!value || value === true) throw new Error(`Missing required argument --${name}`);
      return value;
    },
    resolvePath(...parts) {
      return path.resolve(root, ...parts);
    }
  };
}
