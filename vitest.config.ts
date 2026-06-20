import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Runs every story (and its `play()` interaction test) as a Vitest browser test.
// @storybook/addon-vitest (>=10.3) auto-applies the preview annotations, so no
// setup file is needed.
export default defineConfig({
  plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
  test: {
    name: "storybook",
    // Honest coverage: `include` instruments every primitive (not just the ones
    // a story imports) so untested components report 0% instead of being hidden.
    // Scope is the design system Storybook actually renders — the ui primitives
    // plus the shared cn() helper. lib/{navigation,registry,tokens} are docs-app
    // plumbing (nav data, demo registry, generated token data), never exercised
    // by a story, so they belong to the Next app's coverage, not Storybook's.
    coverage: {
      provider: "v8",
      include: ["components/ui/**", "lib/utils.ts"],
      reporter: ["text", "html"],
      // Ratchet: set just below the current measured numbers so coverage can't
      // silently regress. Raise these as more stories land — never lower them.
      // When run with --coverage (CI does), falling below fails the job.
      thresholds: {
        statements: 80,
        functions: 85,
        branches: 52,
        lines: 80,
      },
    },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
})
