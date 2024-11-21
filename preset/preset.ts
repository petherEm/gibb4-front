import uiPlugin from './plugins/plugin'
import uiTheme from './theme/theme'

export const uiPreset  = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { ...uiTheme },
  plugins: [uiPlugin],
}
