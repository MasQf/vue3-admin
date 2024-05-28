<script setup>
import { useLanguageStore } from '@/stores'
const languageStore = useLanguageStore()
</script>

<template>
  <div>
    <el-config-provider :locale="languageStore.locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
