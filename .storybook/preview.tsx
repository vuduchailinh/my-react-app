import type { Preview } from "@storybook/react";
import {Theme} from '@radix-ui/themes';
import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
