import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

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
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'

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

  // 从 localStorage 初始化
  const savedProfile = localStorage.getItem('user_profile')
  if (savedProfile) {
    try {
      profile.value = { ...profile.value, ...JSON.parse(savedProfile) }
    } catch (e) {
      console.error('Failed to parse user profile from localStorage', e)
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
    skills,
    experiences,
    education,
    socialLinks,
    updateProfile,
    updateSkills,
    updateExperiences,
    updateEducation,
    updateSocialLinks,
    getAvatar,
  }
})
