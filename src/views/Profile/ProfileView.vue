<script setup>
import { ref } from 'vue'
import {
  User,
  Mail,
  MapPin,
  Globe,
  Edit3,
  Check,
  X,
  Code2,
  Briefcase,
  GraduationCap,
  Github,
  Twitter,
  Linkedin,
  Plus,
  Trash2,
  Camera,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { profile, skills, experiences, education, socialLinks } = storeToRefs(userStore)

const isEditing = ref(false)
const editForm = ref({ ...profile.value })
const editSkills = ref([...skills.value])
const editExperiences = ref([...experiences.value])
const editEducation = ref([...education.value])
const editSocialLinks = ref([...socialLinks.value])

const fileInput = ref(null)

const startEdit = () => {
  editForm.value = JSON.parse(JSON.stringify(profile.value))
  editSkills.value = JSON.parse(JSON.stringify(skills.value))
  editExperiences.value = JSON.parse(JSON.stringify(experiences.value))
  editEducation.value = JSON.parse(JSON.stringify(education.value))
  editSocialLinks.value = JSON.parse(JSON.stringify(socialLinks.value))
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = () => {
  userStore.updateProfile(editForm.value)
  userStore.updateSkills(editSkills.value)
  userStore.updateExperiences(editExperiences.value)
  userStore.updateEducation(editEducation.value)
  userStore.updateSocialLinks(editSocialLinks.value)
  isEditing.value = false
}

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 辅助方法：增删项目
const colorPool = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-teal-500',
]

const addSkill = () => {
  const randomColor = colorPool[Math.floor(Math.random() * colorPool.length)]
  editSkills.value.push({ name: '新技能', level: 50, color: randomColor })
}
const removeSkill = (index) => {
  editSkills.value.splice(index, 1)
}

const addExperience = () => {
  editExperiences.value.unshift({
    company: '公司名称',
    role: '职位',
    period: '2024 - Present',
    desc: '工作描述...',
  })
}
const removeExperience = (index) => {
  editExperiences.value.splice(index, 1)
}

const addEducation = () => {
  editEducation.value.unshift({
    school: '学校名称',
    major: '专业',
    degree: '学位',
    period: '2020 - 2024',
  })
}
const removeEducation = (index) => {
  editEducation.value.splice(index, 1)
}

const iconMap = {
  Github,
  Twitter,
  Linkedin,
}
</script>

<template>
  <div class="space-y-6 animate-fade-in-up">
    <!-- 个人信息主体卡片 -->
    <section
      class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 dark:border-zinc-800/50 transition-all duration-300 relative group"
    >
      <!-- 编辑按钮 -->
      <button
        v-if="!isEditing"
        @click="startEdit"
        class="absolute top-6 right-6 p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 cursor-pointer"
        title="编辑个人信息"
      >
        <Edit3 :size="20" />
      </button>

      <!-- 视图模式 -->
      <div v-if="!isEditing" class="flex flex-col md:flex-row items-center gap-8">
        <!-- 头像 -->
        <div class="relative group/avatar">
          <div
            class="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/50 dark:border-zinc-800/50 shadow-xl transition-transform duration-500 group-hover/avatar:scale-105"
          >
            <img :src="userStore.getAvatar()" alt="Avatar" class="w-full h-full object-cover" />
          </div>
          <div class="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-xl shadow-lg">
            <User :size="16" />
          </div>
        </div>

        <!-- 基本信息 -->
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-zinc-100 mb-2">
            {{ profile.name }}
          </h1>
          <p class="text-gray-500 dark:text-zinc-400 mb-4 leading-relaxed">
            {{ profile.bio }}
          </p>

          <div
            class="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-zinc-400"
          >
            <div class="flex items-center gap-1.5">
              <MapPin :size="16" class="text-blue-500" />
              <span>{{ profile.location }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Mail :size="16" class="text-blue-500" />
              <span>{{ profile.email }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Globe :size="16" class="text-blue-500" />
              <span>{{ profile.website }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 编辑模式 -->
      <div v-else class="space-y-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
            <span class="w-1.5 h-5 bg-blue-500 rounded-full"></span>
            设置个人信息
          </h2>
          <div class="flex gap-2">
            <button
              @click="cancelEdit"
              class="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              title="取消"
            >
              <X :size="20" />
            </button>
            <button
              @click="saveEdit"
              class="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25 cursor-pointer"
              title="保存"
            >
              <Check :size="20" />
            </button>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
          <!-- 编辑头像 -->
          <div class="flex flex-col items-center gap-4">
            <div
              @click="triggerFileUpload"
              class="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-dashed border-blue-500/50 hover:border-blue-500 transition-all cursor-pointer group/upload"
            >
              <img
                :src="editForm.avatar || userStore.getAvatar()"
                alt="Preview"
                class="w-full h-full object-cover transition-opacity group-hover/upload:opacity-50"
              />
              <div
                class="absolute inset-0 flex flex-col items-center justify-center text-blue-500 opacity-0 group-hover/upload:opacity-100 transition-opacity"
              >
                <Camera :size="24" />
                <span class="text-xs font-bold mt-1">更换头像</span>
              </div>
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleAvatarUpload"
              />
            </div>
            <p class="text-[10px] text-gray-400">支持 JPG/PNG，小于 2MB</p>
          </div>

          <!-- 表单字段 -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-500 dark:text-zinc-400">昵称</label>
              <input
                v-model="editForm.name"
                type="text"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-500 dark:text-zinc-400">所在地</label>
              <input
                v-model="editForm.location"
                type="text"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-500 dark:text-zinc-400">电子邮箱</label>
              <input
                v-model="editForm.email"
                type="email"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-500 dark:text-zinc-400">个人主页</label>
              <input
                v-model="editForm.website"
                type="text"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all"
              />
            </div>

            <div class="md:col-span-2 space-y-2">
              <label class="text-sm font-medium text-gray-500 dark:text-zinc-400">个人简介</label>
              <textarea
                v-model="editForm.bio"
                rows="3"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-zinc-100 transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增模块：技能掌握 & 经历 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 技能掌握 -->
      <section
        class="lg:col-span-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50 transition-all"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
            <Code2 :size="20" class="text-blue-500" />
            技能掌握
            <span v-if="isEditing" class="text-xs font-normal text-blue-500 animate-pulse ml-2"
              >(拖动调整)</span
            >
          </h2>
          <button
            v-if="isEditing"
            @click="addSkill"
            class="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-all cursor-pointer"
          >
            <Plus :size="16" />
          </button>
        </div>

        <div class="space-y-5">
          <div
            v-for="(skill, index) in isEditing ? editSkills : skills"
            :key="skill.name"
            class="space-y-2 group/skill"
          >
            <div class="flex justify-between text-sm items-center">
              <input
                v-if="isEditing"
                v-model="editSkills[index].name"
                class="bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-gray-700 dark:text-zinc-300 font-medium w-24"
              />
              <span v-else class="font-medium text-gray-700 dark:text-zinc-300">{{
                skill.name
              }}</span>

              <div class="flex items-center gap-2">
                <span
                  class="font-bold tabular-nums transition-colors duration-300 text-sm"
                  :class="isEditing ? 'text-blue-500' : 'text-gray-500 dark:text-zinc-500'"
                >
                  {{ skill.level }}%
                </span>
                <button
                  v-if="isEditing"
                  @click="removeSkill(index)"
                  class="text-red-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 :size="14" />
                </button>
              </div>
            </div>

            <div
              class="relative h-3 w-full bg-gray-100 dark:bg-zinc-800 rounded-full transition-all duration-300"
              :class="[
                isEditing
                  ? 'ring-2 ring-blue-500/20 ring-offset-2 dark:ring-offset-zinc-900 cursor-ew-resize'
                  : 'overflow-hidden',
              ]"
            >
              <!-- 进度显示 -->
              <div
                class="absolute h-full rounded-full transition-all duration-300 ease-out"
                :class="[skill.color, isEditing ? 'brightness-110' : '']"
                :style="{ width: `${skill.level}%` }"
              ></div>

              <!-- 编辑模式下的交互层 -->
              <input
                v-if="isEditing"
                v-model.number="editSkills[index].level"
                type="range"
                min="0"
                max="100"
                class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10 appearance-none"
              />

              <!-- 编辑模式下的装饰轨道 -->
              <div
                v-if="isEditing"
                class="absolute inset-0 border border-dashed border-blue-400/50 rounded-full pointer-events-none"
              ></div>
            </div>
          </div>
        </div>

        <!-- 社交链接 -->
        <div class="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
              社交链接
            </h3>
          </div>
          <div class="flex flex-col gap-3">
            <div
              v-for="(social, index) in isEditing ? editSocialLinks : socialLinks"
              :key="social.platform"
              class="flex items-center gap-3 group/social"
            >
              <div
                class="p-2.5 rounded-xl transition-all duration-300"
                :class="[
                  social.platform === 'Github'
                    ? 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 group-hover/social:bg-blue-500 group-hover/social:text-white'
                    : social.platform === 'Twitter'
                      ? 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 group-hover/social:bg-blue-400 group-hover/social:text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 group-hover/social:bg-blue-700 group-hover/social:text-white',
                ]"
              >
                <component :is="iconMap[social.icon]" :size="20" />
              </div>

              <div class="flex-1 min-w-0">
                <div
                  v-if="!isEditing"
                  class="text-sm font-bold text-gray-700 dark:text-zinc-300 truncate"
                >
                  {{ social.platform }}
                </div>
                <input
                  v-if="isEditing"
                  v-model="editSocialLinks[index].url"
                  placeholder="URL..."
                  class="w-full bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-xs text-blue-500"
                />
                <a
                  v-else
                  :href="social.url"
                  target="_blank"
                  class="text-xs text-gray-400 dark:text-zinc-500 hover:text-blue-500 transition-colors block truncate"
                  :title="social.url"
                >
                  {{ social.url }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 经历与教育 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 工作经历 -->
        <section
          class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
              <Briefcase :size="20" class="text-blue-500" />
              工作经历
            </h2>
            <button
              v-if="isEditing"
              @click="addExperience"
              class="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-all cursor-pointer"
            >
              <Plus :size="16" />
            </button>
          </div>

          <div
            v-if="(isEditing ? editExperiences : experiences).length > 0"
            class="space-y-8 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-gray-100 dark:before:bg-zinc-800"
          >
            <div
              v-for="(exp, index) in isEditing ? editExperiences : experiences"
              :key="index"
              class="relative pl-10 group/exp"
            >
              <div
                class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border-4 border-blue-500 z-10"
              ></div>

              <button
                v-if="isEditing"
                @click="removeExperience(index)"
                class="absolute right-0 top-0 p-1.5 text-red-400 hover:text-red-500 opacity-0 group-hover/exp:opacity-100 transition-all cursor-pointer"
              >
                <Trash2 :size="16" />
              </button>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <input
                  v-if="isEditing"
                  v-model="editExperiences[index].role"
                  class="text-lg font-bold bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-gray-800 dark:text-zinc-100 w-full sm:w-auto"
                />
                <h3 v-else class="text-lg font-bold text-gray-800 dark:text-zinc-100">
                  {{ exp.role }}
                </h3>

                <input
                  v-if="isEditing"
                  v-model="editExperiences[index].period"
                  class="text-sm font-medium bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-blue-500 w-32"
                />
                <span
                  v-else
                  class="text-sm font-medium text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-lg w-fit"
                >
                  {{ exp.period }}
                </span>
              </div>

              <div class="mb-2">
                <input
                  v-if="isEditing"
                  v-model="editExperiences[index].company"
                  class="text-sm font-medium bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-gray-600 dark:text-zinc-400 w-full"
                />
                <div v-else class="text-sm font-medium text-gray-600 dark:text-zinc-400">
                  {{ exp.company }}
                </div>
              </div>

              <textarea
                v-if="isEditing"
                v-model="editExperiences[index].desc"
                rows="2"
                class="w-full text-sm bg-transparent border border-blue-500/30 rounded-lg p-2 focus:border-blue-500 outline-none text-gray-500 dark:text-zinc-500 resize-none"
              ></textarea>
              <p v-else class="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                {{ exp.desc }}
              </p>
            </div>
          </div>

          <!-- 空状态 -->
          <div
            v-else
            class="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-zinc-800/50 rounded-2xl"
          >
            <div
              class="w-12 h-12 mb-3 rounded-full bg-gray-50 dark:bg-zinc-800/50 flex items-center justify-center text-gray-300 dark:text-zinc-600"
            >
              <Briefcase :size="24" />
            </div>
            <p class="text-sm text-gray-400 dark:text-zinc-500">暂无工作经历</p>
            <button
              v-if="isEditing"
              @click="addExperience"
              class="mt-3 text-xs text-blue-500 hover:underline cursor-pointer"
            >
              点击添加
            </button>
          </div>
        </section>

        <!-- 教育背景 -->
        <section
          class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-zinc-800/50"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
              <GraduationCap :size="20" class="text-blue-500" />
              教育背景
            </h2>
            <button
              v-if="isEditing"
              @click="addEducation"
              class="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-all cursor-pointer"
            >
              <Plus :size="16" />
            </button>
          </div>

          <div v-if="(isEditing ? editEducation : education).length > 0" class="space-y-6">
            <div
              v-for="(edu, index) in isEditing ? editEducation : education"
              :key="index"
              class="flex gap-4 relative group/edu"
            >
              <div class="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 h-fit">
                <GraduationCap :size="24" />
              </div>
              <div class="flex-1">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                  <input
                    v-if="isEditing"
                    v-model="editEducation[index].school"
                    class="text-lg font-bold bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-gray-800 dark:text-zinc-100 w-full sm:w-auto"
                  />
                  <h3 v-else class="text-lg font-bold text-gray-800 dark:text-zinc-100">
                    {{ edu.school }}
                  </h3>

                  <input
                    v-if="isEditing"
                    v-model="editEducation[index].period"
                    class="text-sm bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none text-gray-500 w-32"
                  />
                  <span v-else class="text-sm text-gray-500 dark:text-zinc-500">{{
                    edu.period
                  }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <input
                    v-if="isEditing"
                    v-model="editEducation[index].major"
                    class="text-gray-600 dark:text-zinc-400 bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none flex-1"
                  />
                  <span v-if="isEditing" class="text-gray-400">·</span>
                  <input
                    v-if="isEditing"
                    v-model="editEducation[index].degree"
                    class="text-gray-600 dark:text-zinc-400 bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none w-24"
                  />
                  <div v-else class="text-gray-600 dark:text-zinc-400">
                    {{ edu.major }} · {{ edu.degree }}
                  </div>
                </div>
              </div>

              <button
                v-if="isEditing"
                @click="removeEducation(index)"
                class="absolute -right-2 top-0 p-1.5 text-red-400 hover:text-red-500 opacity-0 group-hover/edu:opacity-100 transition-all cursor-pointer"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </div>

          <!-- 空状态 -->
          <div
            v-else
            class="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-zinc-800/50 rounded-2xl"
          >
            <div
              class="w-12 h-12 mb-3 rounded-full bg-gray-50 dark:bg-zinc-800/50 flex items-center justify-center text-gray-300 dark:text-zinc-600"
            >
              <GraduationCap :size="24" />
            </div>
            <p class="text-sm text-gray-400 dark:text-zinc-500">暂无教育背景</p>
            <button
              v-if="isEditing"
              @click="addEducation"
              class="mt-3 text-xs text-blue-500 hover:underline cursor-pointer"
            >
              点击添加
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
