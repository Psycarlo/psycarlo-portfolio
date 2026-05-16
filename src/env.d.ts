/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BREVO_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
