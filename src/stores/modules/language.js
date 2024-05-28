import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export const useLanguageStore = defineStore(
  'language',
  () => {
    const language = ref('zhCn')
    const display = ref('Switch English')
    const locale = computed(() => (language.value === 'zhCn' ? zhCn : en))
    const toggle = () => {
      display.value =
        display.value === 'Switch English' ? '切换中文' : 'Switch English'
      language.value = language.value === 'zhCn' ? 'en' : 'zhCn'
    }
    return {
      language,
      display,
      locale,
      toggle
    }
  },
  {
    persist: true
  }
)
