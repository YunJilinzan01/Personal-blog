import { ref } from 'vue'

export function useAboutEditor(userStore, aboutContent, techStack, socialLinks, profile) {
  const isEditing = ref(false)
  const editedContent = ref({})
  const editedTechStack = ref([])
  const editedSocialLinks = ref([])
  const editedProfile = ref({})
  const newTech = ref('')
  const dragIndex = ref(null)

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
    userStore.resetAboutData()
    if (isEditing.value) {
      editedContent.value = JSON.parse(JSON.stringify(aboutContent.value))
      editedTechStack.value = [...techStack.value]
    }
  }

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

  return {
    isEditing,
    editedContent,
    editedTechStack,
    editedSocialLinks,
    editedProfile,
    newTech,
    dragIndex,
    startEditing,
    cancelEditing,
    saveChanges,
    resetToDefault,
    addTech,
    removeTech,
    addSocial,
    removeSocial,
    addPoint,
    removePoint,
    onDragStart,
    onDragOver,
    onDrop,
  }
}
