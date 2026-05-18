<script setup>
import PostList from './PostList.vue'
import AuthorProfile from '../aside/AuthorProfile.vue'
import TagCloud from '../aside/TagCloud.vue'
import TechOrbit from '../aside/TechOrbit.vue'
import Directory from '../aside/Directory.vue'
</script>
<template>
  <div class="flex flex-1 justify-center gap-5">
    <aside>
      <AuthorProfile />
      <TagCloud />
      <TechOrbit />
      <Directory />
    </aside>
    <main class="flex-1">
      <PostList />
    </main>
    <section
      class="w-80 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 h-fit sticky top-24"
    >
      <h2 class="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          />
        </svg>
        联系我
      </h2>
      <p class="text-gray-600 text-sm leading-relaxed">
        如果你有任何问题、建议或者想要交流技术，欢迎通过以下方式联系我：
      </p>
      <div class="mt-6 space-y-4">
        <div
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
        >
          <div
            class="size-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-500">Email</p>
            <p class="text-sm font-medium text-gray-800">3231789754@qq.com</p>
          </div>
        </div>

        <div
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
        >
          <div
            class="size-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              />
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-500">WeChat</p>
            <p class="text-sm font-medium text-gray-800">YunJilinzan</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
