import { ref } from 'vue'

export function useProfileEditor(userStore, profile, skills, experiences, education, socialLinks) {
  const isEditing = ref(false)
  const editForm = ref({ ...profile.value })
  const editSkills = ref([...skills.value])
  const editExperiences = ref([...experiences.value])
  const editEducation = ref([...education.value])
  const editSocialLinks = ref([...socialLinks.value])
  const fileInput = ref(null)

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

  const getRandomColor = () => colorPool[Math.floor(Math.random() * colorPool.length)]

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
    fileInput.value?.click()
  }

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
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

  const addSkill = () => {
    editSkills.value.push({ name: '新技能', level: 50, color: getRandomColor() })
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

  return {
    isEditing,
    editForm,
    editSkills,
    editExperiences,
    editEducation,
    editSocialLinks,
    fileInput,
    startEdit,
    cancelEdit,
    saveEdit,
    triggerFileUpload,
    handleAvatarUpload,
    addSkill,
    removeSkill,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
  }
}
