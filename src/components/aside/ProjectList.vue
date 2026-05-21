<script setup>
import { ref, onMounted, watch } from 'vue'
import { Plus, Trash2, FolderOpen } from 'lucide-vue-next'

const projects = ref([
  {
    id: 1,
    title: '电商后台管理系统',
    description:
      '基于 Vue 3 + Element Plus 开发的电商后台管理系统，支持商品管理、订单管理、用户管理等功能。',
    link: '#',
    tags: ['Pinia', 'LocalStorage'],
    tagColors: 'bg-orange-100/50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  },
  {
    id: 2,
    title: '个人博客系统',
    description: '基于 Vue 3 + Tailwind CSS 开发的个人极简风格博客，支持暗黑模式和玻璃拟态设计。',
    link: 'https://github.com/YunJiLinZan01',
    tags: ['Vue 3', 'Tailwind'],
    tagColors: 'bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
])

const colorPool = [
  'bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  'bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  'bg-amber-100/50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  'bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  'bg-cyan-100/50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
  'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
]

const getRandomColor = () => colorPool[Math.floor(Math.random() * colorPool.length)]

// 从本地存储加载数据
onMounted(() => {
  try {
    const savedProjects = localStorage.getItem('blog-projects')
    if (savedProjects) {
      projects.value = JSON.parse(savedProjects)
    }
  } catch (e) {
    console.error('解析本地项目数据失败，已重置:', e)
    localStorage.removeItem('blog-projects')
  }
})

// 监听数据变化并持久化
watch(
  projects,
  (newVal) => {
    localStorage.setItem('blog-projects', JSON.stringify(newVal))
  },
  { deep: true },
)

const isAdding = ref(false)
const newProject = ref({
  title: '',
  link: '',
  description: '',
  tags: '', // 用于输入框的临时字符串
})

const addProject = () => {
  if (newProject.value.title && newProject.value.link) {
    // 处理标签：按逗号分割并清理空格
    const tagList = newProject.value.tags
      ? newProject.value.tags
          .split(/[,，]/)
          .map((t) => t.trim())
          .filter((t) => t)
      : ['新项目']

    projects.value.push({
      id: Date.now(),
      title: newProject.value.title,
      description: newProject.value.description || '暂无描述',
      link: newProject.value.link,
      tags: tagList,
      tagColors: getRandomColor(), // 随机分配颜色
    })

    // 重置表单
    newProject.value = { title: '', link: '', description: '', tags: '' }
    isAdding.value = false
  }
}

const removeProject = (id) => {
  projects.value = projects.value.filter((p) => p.id !== id)
}
</script>

<template>
  <div
    class="w-full lg:w-87.5 p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl transition-colors duration-300 border border-white/20 dark:border-zinc-800/50 shadow-sm"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-[#37a8ec] rounded-full"></span>
        个人项目
      </h3>
      <button
        @click="isAdding = !isAdding"
        class="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-[#37a8ec] hover:text-white dark:hover:bg-[#37a8ec] dark:hover:text-white transition-all duration-300 cursor-pointer shadow-sm group"
        :class="{ 'bg-[#37a8ec] text-white rotate-45': isAdding }"
        title="添加项目"
      >
        <Plus :size="18" class="group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>

    <!-- 添加项目表单 -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="isAdding"
        class="mb-6 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700/50"
      >
        <div class="space-y-3">
          <input
            v-model="newProject.title"
            type="text"
            placeholder="项目名称"
            class="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-[#37a8ec] dark:text-zinc-200 transition-colors"
          />
          <input
            v-model="newProject.link"
            type="text"
            placeholder="项目链接 (Github/Demo)"
            class="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-[#37a8ec] dark:text-zinc-200 transition-colors"
          />
          <input
            v-model="newProject.tags"
            type="text"
            placeholder="标签 (多个请用逗号分隔)"
            class="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-[#37a8ec] dark:text-zinc-200 transition-colors"
          />
          <textarea
            v-model="newProject.description"
            placeholder="项目描述..."
            rows="2"
            class="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-[#37a8ec] dark:text-zinc-200 transition-colors resize-none"
          ></textarea>
          <button
            @click="addProject"
            class="w-full py-2 bg-[#37a8ec] text-white rounded-lg text-sm font-medium hover:bg-[#2d8dc7] transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
          >
            确认添加
          </button>
        </div>
      </div>
    </Transition>

    <div class="flex flex-col gap-4">
      <!-- 空状态提示 -->
      <div
        v-if="projects.length === 0"
        class="py-8 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-xl transition-colors"
      >
        <div
          class="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-full mb-3 text-zinc-400 dark:text-zinc-500"
        >
          <FolderOpen :size="24" />
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium">暂无项目展示</p>
        <p class="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
          点击右上角按钮添加您的第一个项目
        </p>
      </div>

      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="relative group/item p-2 -m-2 rounded-xl transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/30"
      >
        <!-- 删除按钮 -->
        <button
          @click.stop="removeProject(project.id)"
          class="absolute right-0 top-0 p-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg opacity-0 group-hover/item:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer z-20 shadow-sm border border-red-100 dark:border-red-900/30"
          title="删除项目"
        >
          <Trash2 :size="14" />
        </button>

        <!-- 项目内容 -->
        <div class="group pr-8">
          <a
            :href="project.link"
            target="_blank"
            class="text-lg font-medium text-gray-700 dark:text-zinc-200 group-hover:text-[#37a8ec] transition-colors duration-300 flex items-center gap-1.5"
          >
            {{ project.title }}
            <span
              class="text-xs text-zinc-400 group-hover:translate-x-1 transition-transform duration-300"
              >→</span
            >
          </a>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {{ project.description }}
          </p>
          <div class="flex gap-2 mt-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-[10px] px-2 py-0.5 rounded-md transition-colors"
              :class="project.tagColors"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 分割线 (最后一个项目后不显示) -->
        <div
          v-if="index !== projects.length - 1"
          class="h-px bg-gray-100 dark:bg-zinc-800/50 w-full mt-4"
        ></div>
      </div>
    </div>
  </div>
</template>
