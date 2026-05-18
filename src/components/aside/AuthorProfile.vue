<script setup>
import VueIcon from "@/components/icons/VueIcon.vue";
import ViteIcon from "@/components/icons/ViteIcon.vue"
import JSIcon from "@/components/icons/JSIcon.vue"
import TWCIcon from "@/components/icons/TWCIcon.vue"
import GitHubIcon from "@/components/icons/GitHubIcon.vue"
</script>

<template>
  <div class="w-87.5 p-3 bg-white/80 rounded-xl py-4">
    <div class="w-full h-75 bg-blue-400 rounded-xl">
      <img src="../../assets/images/author.jpg" alt="Author" class="w-full h-full object-cover rounded-xl" />
    </div>
    <h4 class="text-2xl font-bold my-4 text-center">YunJilinzan</h4>
    <span class="block text-gray-600 text-center py-1.5">Email: 3231789754@qq.com </span>
    <p class="text-gray-600 text-center">
      你好！我是一个热爱编程的开发者，喜欢分享我的技术经验和生活点滴。
    </p>
    <div class="mt-4 flex justify-center gap-2 text-gray-600">
      <div class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
        <GitHubIcon></GitHubIcon>
      </div>
      <div class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
        <VueIcon></VueIcon>
      </div>
      <div class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
        <ViteIcon></ViteIcon>
      </div>
      <div class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
        <JSIcon></JSIcon>
      </div>
      <div class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
        <TWCIcon></TWCIcon>
      </div>
    </div>
  </div>
</template>
