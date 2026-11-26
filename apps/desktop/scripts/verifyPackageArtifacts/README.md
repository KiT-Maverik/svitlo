# Verify Forge packaging outputs

`node apps/desktop/scripts/verifyPackageArtifacts/verify-package-artifacts.mjs <unpacked|win32|darwin|linux>`

This read-only check requires an existing `apps/desktop/out/` from `electron-forge package` or `electron-forge make`. It checks Linux executable presence or the platform-specific maker files and nontrivial sizes. Artifact production is **not** installer execution or signing verification. No network requests, source edits or hidden fallbacks.
