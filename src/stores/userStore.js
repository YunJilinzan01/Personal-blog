import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  const profile = ref({
    name: 'YunJilinzan',
    bio: '探索技术的边界，记录生活的点滴。一名对前端交互和后端架构充满热情的全栈开发工程师。',
    location: '中国 · 深圳',
    email: '3231789754@qq.com',
    website: 'www.yunji.me',
    avatar: '',
  })

  const skills = ref([
    { name: 'Vue.js', level: 90, color: 'bg-emerald-500' },
    { name: 'React', level: 85, color: 'bg-blue-500' },
    { name: 'TypeScript', level: 88, color: 'bg-blue-600' },
    { name: 'Node.js', level: 82, color: 'bg-green-500' },
    { name: 'Tailwind CSS', level: 95, color: 'bg-cyan-500' },
    { name: 'Python', level: 75, color: 'bg-yellow-500' },
  ])

  const experiences = ref([
    {
      company: 'Tech Innovators Co.',
      role: 'Senior Frontend Developer',
      period: '2022 - Present',
      desc: '负责核心业务系统的架构设计与开发，主导了前端性能优化专项，提升页面加载速度 40%。',
    },
    {
      company: 'Creative Solutions Studio',
      role: 'Full Stack Engineer',
      period: '2020 - 2022',
      desc: '主导了多个响应式 Web 应用的从零到一开发，涵盖了电商、社交等多个领域。',
    },
  ])

  const education = ref([
    {
      school: '某某理工大学',
      major: '计算机科学与技术',
      degree: '本科',
      period: '2016 - 2020',
    },
  ])

  const socialLinks = ref([
    { platform: 'Github', url: '#', icon: 'Github' },
    { platform: 'Twitter', url: '#', icon: 'Twitter' },
    { platform: 'Linkedin', url: '#', icon: 'Linkedin' },
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
  }
})
