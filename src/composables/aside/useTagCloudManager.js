import { ref } from 'vue'

export function useTagCloudManager(blogStore) {
  const isEditing = ref(false)
  const newTagName = ref('')
  const dragIndex = ref(null)

  const toggleEdit = () => {
    isEditing.value = !isEditing.value
    newTagName.value = ''
  }

  const addNewTag = () => {
    if (newTagName.value.trim()) {
      blogStore.addTag(newTagName.value.trim())
      newTagName.value = ''
    }
  }

  const removeTag = (index) => {
    blogStore.removeTag(index)
  }

  const onDragStart = (index) => {
    dragIndex.value = index
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (index) => {
    if (dragIndex.value === null) return
    const newTags = [...blogStore.tags]
    const draggedItem = newTags.splice(dragIndex.value, 1)[0]
    newTags.splice(index, 0, draggedItem)
    blogStore.updateTags(newTags)
    dragIndex.value = null
  }

  return {
    isEditing,
    newTagName,
    dragIndex,
    toggleEdit,
    addNewTag,
    removeTag,
    onDragStart,
    onDragOver,
    onDrop,
  }
}
