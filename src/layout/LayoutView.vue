<script setup>
import HeaderView from '@/components/header/HeaderView.vue'
import StarsBackground from '@/components/UI/StarsBackground/StarsBackground.vue'
import { toggleStore } from '@/stores/toggleStore'
import { storeToRefs } from 'pinia'

const store = toggleStore()
const { isDark } = storeToRefs(store)
</script>

<template>
  <div
    class="relative flex w-full min-h-screen flex-col items-center justify-center overflow-clip transition-all duration-300"
  >
    <StarsBackground :factor="0.05" :speed="50" star-color="#fff" class="flex justify-center">
      <div class="w-full max-w-350 px-4">
        <div>
          <div class="header flex justify-center">
            <HeaderView></HeaderView>
          </div>
          <div class="main pt-24 md:pt-87.5">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </StarsBackground>
  </div>
</template>
