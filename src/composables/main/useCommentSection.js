import { ref, onMounted, watch } from 'vue'

export function useCommentSection(props) {
  const comments = ref([])
  const newComment = ref({
    author: '',
    content: '',
  })

  const loadComments = () => {
    const savedComments = localStorage.getItem(`post_comments_${props.postId}`)
    if (savedComments) {
      comments.value = JSON.parse(savedComments)
    } else {
      comments.value = []
    }
  }

  const saveComments = () => {
    localStorage.setItem(`post_comments_${props.postId}`, JSON.stringify(comments.value))
  }

  const handleSubmit = () => {
    if (!newComment.value.author.trim() || !newComment.value.content.trim()) return

    const comment = {
      id: Date.now(),
      author: newComment.value.author,
      content: newComment.value.content,
      date: new Date().toLocaleString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newComment.value.author}`,
    }

    comments.value.unshift(comment)
    saveComments()
    newComment.value.author = ''
    newComment.value.content = ''
  }

  const deleteComment = (id) => {
    comments.value = comments.value.filter((c) => c.id !== id)
    saveComments()
  }

  onMounted(loadComments)

  watch(() => props.postId, loadComments)

  return {
    comments,
    newComment,
    handleSubmit,
    deleteComment,
  }
}
