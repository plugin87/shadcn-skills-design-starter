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
    // axe runs on every story; surfaces violations in the a11y panel without
    // failing the test run. Flip to "error" to enforce in CI.
    a11y: { test: "todo" },
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
