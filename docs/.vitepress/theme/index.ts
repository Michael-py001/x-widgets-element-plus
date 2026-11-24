import DefaultTheme from 'vitepress/theme'
import ControlDemo from '../components/ControlDemo.vue'
import AdvancedDemo from '../components/AdvancedDemo.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: Parameters<NonNullable<typeof DefaultTheme.enhanceApp>>[0]) {
    DefaultTheme.enhanceApp?.({ app } as Parameters<NonNullable<typeof DefaultTheme.enhanceApp>>[0])
    app.component('ElementControlDemo', ControlDemo)
    app.component('ElementAdvancedDemo', AdvancedDemo)
  },
}
