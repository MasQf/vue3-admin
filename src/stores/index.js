import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export * from '@/stores/modules/user'
export * from '@/stores/modules/language'

export default pinia
