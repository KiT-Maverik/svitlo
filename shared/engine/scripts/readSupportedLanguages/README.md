# Static Engine language roster

`read-supported-languages.mjs` extracts language codes from the canonical Engine `DEFAULT_SUPPORTED_LANGUAGES` declaration without executing TypeScript. Build-time documentation generators may use this helper instead of introducing another hardcoded language list. It does not register languages or affect runtime publication.
