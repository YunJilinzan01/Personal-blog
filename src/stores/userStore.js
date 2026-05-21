import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import avatar from '@/assets/images/author.jpg'
export const useUserStore = defineStore('user', () => {
  const profile = ref({
    name: '您的昵称',
    bio: '在这里写下您的个人简介，向世界展示您自己。',
    location: '您的所在地',
    email: 'yourname@example.com',
    website: 'www.yourwebsite.com',
    avatar: '', // 存储 Base64 字符串
  })

  // 默认头像占位图
  const defaultAvatar = avatar

  const getAvatar = () => profile.value.avatar || defaultAvatar

  const skills = ref([
    { name: '技能名称 1', level: 80, color: 'bg-blue-500' },
    { name: '技能名称 2', level: 70, color: 'bg-emerald-500' },
    { name: '技能名称 3', level: 90, color: 'bg-purple-500' },
  ])

  const experiences = ref([])

  const education = ref([])

  const socialLinks = ref([
    { platform: 'Github', url: 'https://github.com/yourusername', icon: 'Github' },
    { platform: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'Twitter' },
    { platform: 'Linkedin', url: 'https://linkedin.com/in/yourusername', icon: 'Linkedin' },
  ])

  // 关于我页面的内容
  const aboutContent = ref({
    title: '关于我',
    introduction: '欢迎来到我的博客！我是一名开发者，热衷于探索新技术并分享我的学习历程。',
    description: '在这个博客中，我将分享：',
    points: ['技术教程与深度解析', '项目开发经验', '学习笔记与心得', '生活随笔与思考'],
  })

  const techStack = ref(['Vue.js', 'JavaScript', 'CSS', 'HTML'])

  const isAdminMode = ref(false)

  // 默认数据，用于重置
  const defaultAboutData = {
    content: {
      title: '关于我',
      introduction: '欢迎来到我的博客！我是一名开发者，热衷于探索新技术并分享我的学习历程。',
      description: '在这个博客中，我将分享：',
      points: ['技术教程与深度解析', '项目开发经验', '学习笔记与心得', '生活随笔与思考'],
    },
    techStack: ['Vue.js', 'JavaScript', 'CSS', 'HTML'],
  }

  const resetAboutData = () => {
    aboutContent.value = JSON.parse(JSON.stringify(defaultAboutData.content))
    techStack.value = [...defaultAboutData.techStack]
  }

  // 从 localStorage 初始化
  const savedProfile = localStorage.getItem('user_profile')
  if (savedProfile) {
    try {
      profile.value = { ...profile.value, ...JSON.parse(savedProfile) }
    } catch (e) {
      console.error('Failed to parse user profile from localStorage', e)
    }
  }

  const savedAboutContent = localStorage.getItem('user_about_content')
  if (savedAboutContent) {
    try {
      aboutContent.value = JSON.parse(savedAboutContent)
    } catch (e) {
      console.error('Failed to parse about content from localStorage', e)
    }
  }

  const savedTechStack = localStorage.getItem('user_tech_stack')
  if (savedTechStack) {
    try {
      techStack.value = JSON.parse(savedTechStack)
    } catch (e) {
      console.error('Failed to parse tech stack from localStorage', e)
    }
  }

  const savedSkills = localStorage.getItem('user_skills')
  if (savedSkills) {
    try {
      skills.value = JSON.parse(savedSkills)
    } catch (e) {
      console.error('Failed to parse user skills from localStorage', e)
    }
  }

  const savedExperiences = localStorage.getItem('user_experiences')
  if (savedExperiences) {
    try {
      experiences.value = JSON.parse(savedExperiences)
    } catch (e) {
      console.error('Failed to parse user experiences from localStorage', e)
    }
  }

  const savedEducation = localStorage.getItem('user_education')
  if (savedEducation) {
    try {
      education.value = JSON.parse(savedEducation)
    } catch (e) {
      console.error('Failed to parse user education from localStorage', e)
    }
  }

  const savedSocialLinks = localStorage.getItem('user_social_links')
  if (savedSocialLinks) {
    try {
      socialLinks.value = JSON.parse(savedSocialLinks)
    } catch (e) {
      console.error('Failed to parse user social links from localStorage', e)
    }
  }

  // 监听变化并保存
  watch(
    profile,
    (newProfile) => {
      localStorage.setItem('user_profile', JSON.stringify(newProfile))
    },
    { deep: true },
  )

  watch(
    skills,
    (newSkills) => {
      localStorage.setItem('user_skills', JSON.stringify(newSkills))
    },
    { deep: true },
  )

  watch(
    experiences,
    (newExp) => {
      localStorage.setItem('user_experiences', JSON.stringify(newExp))
    },
    { deep: true },
  )

  watch(
    education,
    (newEdu) => {
      localStorage.setItem('user_education', JSON.stringify(newEdu))
    },
    { deep: true },
  )

  watch(
    socialLinks,
    (newSocial) => {
      localStorage.setItem('user_social_links', JSON.stringify(newSocial))
    },
    { deep: true },
  )

  watch(
    aboutContent,
    (newVal) => {
      localStorage.setItem('user_about_content', JSON.stringify(newVal))
    },
    { deep: true },
  )

  watch(
    techStack,
    (newVal) => {
      localStorage.setItem('user_tech_stack', JSON.stringify(newVal))
    },
    { deep: true },
  )

  const updateProfile = (newData) => {
    profile.value = { ...profile.value, ...newData }
  }

  const updateSkills = (newSkills) => {
    skills.value = [...newSkills]
  }

  const updateExperiences = (newExp) => {
    experiences.value = [...newExp]
  }

  const updateEducation = (newEdu) => {
    education.value = [...newEdu]
  }

  const updateSocialLinks = (newSocial) => {
    socialLinks.value = [...newSocial]
  }

  return {
    profile,
    getAvatar,
    skills,
    experiences,
    education,
    socialLinks,
    aboutContent,
    techStack,
    isAdminMode,
    resetAboutData,
    updateProfile,
    updateSkills,
    updateExperiences,
    updateEducation,
    updateSocialLinks,
  }
})
