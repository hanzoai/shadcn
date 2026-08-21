import { defineWorkspace } from "vitest/config"

export default defineWorkspace([
  "./vitest.config.ts",
  "./pkg/tests/vitest.config.ts",
])
