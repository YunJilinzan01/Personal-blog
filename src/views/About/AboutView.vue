<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import {
  Settings2,
  Save,
  RotateCcw,
  Plus,
  X,
  GripVertical,
  Code2,
  Activity,
  Mail,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-vue-next'

const userStore = useUserStore()
const { aboutContent, techStack, isAdminMode, profile, socialLinks } = storeToRefs(userStore)

const isEditing = ref(false)
const editedContent = ref({})
const editedTechStack = ref([])
const editedSocialLinks = ref([])
const editedProfile = ref({})

const startEditing = () => {
  editedContent.value = JSON.parse(JSON.stringify(aboutContent.value))
  editedTechStack.value = [...techStack.value]
  editedSocialLinks.value = JSON.parse(JSON.stringify(socialLinks.value))
  editedProfile.value = { ...profile.value }
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
}

const saveChanges = () => {
  aboutContent.value = JSON.parse(JSON.stringify(editedContent.value))
  techStack.value = [...editedTechStack.value]
  userStore.updateSocialLinks(editedSocialLinks.value)
  userStore.updateProfile(editedProfile.value)
  isEditing.value = false
}

const resetToDefault = () => {
  if (confirm('确定要重置所有内容到初始状态吗？')) {
    userStore.resetAboutData()
    if (isEditing.value) {
      editedContent.value = JSON.parse(JSON.stringify(aboutContent.value))
      editedTechStack.value = [...techStack.value]
    }
  }
}

const newTech = ref('')
const addTech = () => {
  if (newTech.value.trim()) {
    editedTechStack.value.push(newTech.value.trim())
    newTech.value = ''
  }
}

const removeTech = (index) => {
  editedTechStack.value.splice(index, 1)
}

const addSocial = () => {
  editedSocialLinks.value.push({ platform: '新平台', url: '', icon: 'Github' })
}

const removeSocial = (index) => {
  editedSocialLinks.value.splice(index, 1)
}

const addPoint = () => {
  editedContent.value.points.push('')
}

const removePoint = (index) => {
  editedContent.value.points.splice(index, 1)
}

const dragIndex = ref(null)

const onDragStart = (index) => {
  dragIndex.value = index
}

const onDragOver = (e) => {
  e.preventDefault()
}

const onDrop = (index) => {
  const item = editedTechStack.value.splice(dragIndex.value, 1)[0]
  editedTechStack.value.splice(index, 0, item)
  dragIndex.value = null
}

const iconMap = {
  Github,
  Twitter,
  Linkedin,
  Mail,
}
</script>

<template>
  <div class="space-y-6 pb-12">
    <section
      class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-all duration-300 relative group"
    >
      <div class="absolute top-6 right-6 z-10">
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-100/50 dark:border-blue-800/30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 active:scale-95 shadow-sm"
          title="编辑关于我"
        >
          <Settings2 class="w-4 h-4" />
          <span>编辑</span>
        </button>
        <div v-else class="flex gap-2">
          <button
            @click="resetToDefault"
            class="p-2 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-100/50 dark:border-amber-800/30 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-all active:scale-95"
            title="恢复初始设置"
          >
            <RotateCcw class="w-4 h-4" />
          </button>
          <button
            @click="cancelEditing"
            class="p-2 text-gray-600 dark:text-zinc-400 bg-gray-100/50 dark:bg-zinc-800/50 rounded-xl border border-gray-200/50 dark:border-zinc-700/50 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
            title="取消"
          >
            <X class="w-4 h-4" />
          </button>
          <button
            @click="saveChanges"
            class="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            title="保存修改"
          >
            <Save class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="flex items-center gap-3 mb-6">
        <span class="w-1.5 h-6 bg-blue-500 rounded-full shrink-0"></span>
        <input
          v-if="isEditing"
          v-model="editedContent.title"
          class="text-2xl font-bold text-gray-800 dark:text-zinc-100 bg-transparent border-b border-blue-500/50 focus:border-blue-500 outline-none w-full"
        />
        <h2 v-else class="text-2xl font-bold text-gray-800 dark:text-zinc-100">
          {{ aboutContent.title }}
        </h2>
      </div>

      <div
        class="prose dark:prose-invert max-w-none text-gray-600 dark:text-zinc-400 leading-relaxed"
      >
        <!-- Introduction -->
        <div class="mb-6">
          <div v-if="isEditing" class="space-y-2">
            <label class="text-xs font-medium text-gray-400 uppercase tracking-wider"
              >个人简介 (支持 HTML)</label
            >
            <textarea
              v-model="editedContent.introduction"
              rows="3"
              class="w-full p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all resize-none"
            ></textarea>
          </div>
          <p v-else class="mb-4" v-html="aboutContent.introduction"></p>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <input
            v-if="isEditing"
            v-model="editedContent.description"
            class="w-full p-2 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all"
          />
          <p v-else>{{ aboutContent.description }}</p>
        </div>

        <!-- Points List -->
        <div class="space-y-3">
          <div v-if="isEditing" class="space-y-2">
            <div
              v-for="(point, index) in editedContent.points"
              :key="index"
              class="flex items-center gap-2 group"
            >
              <div class="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></div>
              <input
                v-model="editedContent.points[index]"
                class="flex-1 p-2 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all"
              />
              <button
                @click="removePoint(index)"
                class="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
            <button
              @click="addPoint"
              class="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors w-full justify-center border border-dashed border-blue-200 dark:border-blue-800/50"
            >
              <Plus class="w-4 h-4" />
              <span>添加要点</span>
            </button>
          </div>
          <ul v-else class="list-none space-y-3 ml-4">
            <li
              v-for="(point, index) in aboutContent.points"
              :key="index"
              class="flex items-start gap-3"
            >
              <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 shrink-0"></span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Skills and Contact Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Tech Stack -->
      <div
        class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50"
      >
        <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-zinc-100 flex items-center gap-2">
          <Code2 class="w-5 h-5 text-blue-500" />
          技术栈
        </h3>

        <div v-if="isEditing" class="space-y-4">
          <!-- Add New Tech -->
          <div class="flex gap-2">
            <input
              v-model="newTech"
              @keyup.enter="addTech"
              placeholder="添加新技能..."
              class="flex-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all"
            />
            <button
              @click="addTech"
              class="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all active:scale-95"
            >
              <Plus class="w-5 h-5" />
            </button>
          </div>

          <!-- Draggable List -->
          <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <div
              v-for="(skill, index) in editedTechStack"
              :key="index"
              draggable="true"
              @dragstart="onDragStart(index)"
              @dragover="onDragOver"
              @drop="onDrop(index)"
              class="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 cursor-move hover:border-blue-400 dark:hover:border-blue-500/50 transition-all group"
            >
              <GripVertical
                class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
              />
              <input
                v-model="editedTechStack[index]"
                class="flex-1 text-sm bg-transparent border-none outline-none"
              />
              <button
                @click="removeTech(index)"
                class="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-[10px] text-gray-400 text-center uppercase tracking-widest">
            拖拽可调整排序
          </p>
        </div>

        <div v-else class="flex flex-wrap gap-2">
          <span
            v-for="skill in techStack"
            :key="skill"
            class="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm border border-blue-100 dark:border-blue-800/30 hover:scale-105 transition-transform cursor-default"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Contact Info -->
      <div
        class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50"
      >
        <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-zinc-100 flex items-center gap-2">
          <Activity class="w-5 h-5 text-green-500" />
          联系方式
        </h3>

        <div v-if="isEditing" class="space-y-4">
          <!-- Email Edit -->
          <div class="space-y-1">
            <label class="text-[10px] text-gray-400 uppercase tracking-widest px-2">Email</label>
            <div
              class="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700"
            >
              <Mail class="w-4 h-4 text-blue-500" />
              <input
                v-model="editedProfile.email"
                class="flex-1 text-sm bg-transparent border-none outline-none"
                placeholder="您的邮箱"
              />
            </div>
          </div>

          <!-- Social Links Edit -->
          <div class="space-y-2">
            <label class="text-[10px] text-gray-400 uppercase tracking-widest px-2">社交链接</label>
            <div
              v-for="(link, index) in editedSocialLinks"
              :key="index"
              class="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <component :is="iconMap[link.icon] || Github" class="w-4 h-4 text-blue-500" />
                  <input
                    v-model="link.platform"
                    class="text-xs font-bold bg-transparent border-none outline-none w-24"
                  />
                </div>
                <button
                  @click="removeSocial(index)"
                  class="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
              <input
                v-model="link.url"
                class="text-xs text-gray-500 dark:text-zinc-400 bg-white/50 dark:bg-zinc-900/50 p-2 rounded-lg border border-gray-100 dark:border-zinc-800 outline-none focus:border-blue-500/50"
                placeholder="链接地址"
              />
            </div>
            <button
              @click="addSocial"
              class="flex items-center gap-2 px-3 py-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors w-full justify-center border border-dashed border-blue-200 dark:border-blue-800/50"
            >
              <Plus class="w-3 h-3" />
              <span>添加社交链接</span>
            </button>
          </div>
        </div>

        <ul v-else class="space-y-4 text-gray-600 dark:text-zinc-400">
          <li
            class="flex items-center gap-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors group"
          >
            <div
              class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"
            >
              <Mail class="w-5 h-5" />
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-gray-400 uppercase tracking-wider">Email</span>
              <a
                :href="'mailto:' + profile.email"
                class="text-sm font-medium hover:text-blue-500 transition-colors"
              >
                {{ profile.email }}
              </a>
            </div>
          </li>
          <li
            v-for="link in socialLinks"
            :key="link.platform"
            class="flex items-center gap-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors group"
          >
            <div
              class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform"
            >
              <component :is="iconMap[link.icon] || Github" class="w-5 h-5" />
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-gray-400 uppercase tracking-wider">{{
                link.platform
              }}</span>
              <a
                :href="link.url"
                target="_blank"
                class="text-sm font-medium hover:text-blue-500 transition-colors truncate max-w-[200px]"
              >
                {{ link.url.replace(/^https?:\/\//, '') }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.prose :deep(p) {
  margin-bottom: 1rem;
}

.cursor-move {
  cursor: grab;
}

.cursor-move:active {
  cursor: grabbing;
}
</style>
