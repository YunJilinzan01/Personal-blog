import { ref, reactive } from 'vue'

export function usePostModal(emit) {
  const showConfirm = ref(false)
  const form = reactive({
    title: '',
    excerpt: '',
    content: '',
    category: '默认分类',
    tags: '',
    cover: '',
  })

  const isDirty = () => {
    return (
      form.title.trim() !== '' ||
      form.content.trim() !== '' ||
      form.cover.trim() !== '' ||
      form.tags.trim() !== '' ||
      form.category !== '默认分类'
    )
  }

  const resetForm = () => {
    form.title = ''
    form.excerpt = ''
    form.content = ''
    form.category = '默认分类'
    form.tags = ''
    form.cover = ''
  }

  const handleClose = () => {
    if (isDirty()) {
      showConfirm.value = true
    } else {
      emit('close')
    }
  }

  const confirmCancel = () => {
    showConfirm.value = false
  }

  const confirmClose = () => {
    showConfirm.value = false
    resetForm()
    emit('close')
  }

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) return

    const postData = {
      title: form.title,
      excerpt: form.excerpt || form.content.substring(0, 100).replace(/<[^>]*>/g, '') + '...',
      content: form.content,
      category: form.category,
      tags: form.tags
        .split(/[,，]/)
        .map((t) => t.trim())
        .filter((t) => t),
      cover: form.cover || null,
      readingTime: Math.ceil(form.content.length / 500) + ' min',
    }

    emit('submit', postData)
    resetForm()
    emit('close')
  }

  return {
    showConfirm,
    form,
    handleClose,
    confirmCancel,
    confirmClose,
    handleSubmit,
  }
}
