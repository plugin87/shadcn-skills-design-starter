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
    coverage: {
      provider: "v8",
      include: ["components/ui/**", "lib/**"],
      reporter: ["text", "html"],
    },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
})
