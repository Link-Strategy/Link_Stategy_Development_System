---
trigger: always_on
description: "Portable contract consumption discipline for Hands workspaces."
---
# LS-RULE-CONTRACT-IMPORTS

Hands code must stay portable between Satellite and Brain harvest paths, regardless of framework or language runtime.

## What Hands Must Do

Hands must consume contracts through the adapter that Brain has already provided for the current workspace.

1. Check the workspace config for an explicit contract adapter:
   - TypeScript: `tsconfig.json` path alias or package dependency.
   - Python: `pyproject.toml`, `requirements.txt`, or package/module docs provided by Brain.
   - Dart/Flutter: `pubspec.yaml` or package docs provided by Brain.
   - Other runtimes: adapter documented by Brain in the workspace.
2. Use only that adapter in application code.
3. If the adapter is compile-time/type-only, use it only for types.
4. If runtime values such as enums/constants are needed, use a Brain-owned runtime adapter/package.
5. If the required adapter is missing, stop and record a blocker in `02_DECISION_LOGS.md`.

The current generated contract assets live under `assets/contracts/generated/`, but that location is DNA storage, not an application import boundary.

An adapter is valid only when it exists in workspace governance or dependency config. Names below are patterns unless the exact adapter name is present in the workspace.

## Examples

TypeScript, when Brain provides the current type-only adapter:

```ts
import type { Identity } from "@contracts/identity";
```

Python, only when Brain provides a Python package adapter in workspace config:

```text
from BRAIN_PROVIDED_CONTRACT_PACKAGE.identity import Identity
```

Dart/Flutter, only when Brain provides a Dart package adapter in workspace config:

```text
import 'package:BRAIN_PROVIDED_CONTRACT_PACKAGE/identity.dart';
```

Runtime enum/constants imports are not available unless Brain provides a runtime adapter/package in the workspace dependency config. Until then, record a blocker instead of inventing an import.

The exact adapter name may differ by framework. The rule is: use the Brain-provided adapter, not the physical generated file path.

## Forbidden

Do not import generated contracts through relative paths.

TypeScript:

```ts
import type { Identity } from "../assets/contracts/generated/typescript/identity";
```

Python:

```python
from assets.contracts.generated.python.identity import Identity
from ..assets.contracts.generated.python.identity import Identity
```

Dart/Flutter:

```dart
import '../assets/contracts/generated/dart/identity.dart';
import 'assets/contracts/generated/dart/identity.dart';
```

Do not use runtime-specific alias mechanisms unless Brain has explicitly provided that adapter for the workspace. These mechanisms can resolve differently between Satellite and Brain package roots.

Do not copy generated contract files into `src/` to make imports easier.

Do not hardcode enum/string values when the contract adapter is missing. Record a blocker instead.

---
**Status:** ACTIVE PORTABILITY RULE  
**Priority:** LEVEL 1
