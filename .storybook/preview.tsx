import * as React from "react"
import type { Preview } from "@storybook/nextjs-vite"
import { withThemeByClassName } from "@storybook/addon-themes"

import "../app/globals.css"

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // axe runs on every story and FAILS the test run on any violation, so a11y
    // regressions are caught in CI alongside the interaction tests.
    a11y: {
      test: "error",
      config: {
        // "region" expects all content inside a landmark — a false positive for
        // isolated component stories (a component is not a full page).
        rules: [{ id: "region", enabled: false }],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
      parentSelector: "html",
    }),
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
}

export default preview
