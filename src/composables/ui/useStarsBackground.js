import { ref, computed, onMounted, watch } from 'vue'

function generateStars(count, starColor) {
  const shadows = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000
    const y = Math.floor(Math.random() * 4000) - 2000
    shadows.push(`${x}px ${y}px ${starColor}`)
  }
  return shadows.join(', ')
}

export function useStarsBackground(props) {
  const offsetX = ref(1)
  const offsetY = ref(1)
  const boxShadow1 = ref('')
  const boxShadow2 = ref('')
  const boxShadow3 = ref('')

  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const newOffsetX = -(e.clientX - centerX) * props.factor
    const newOffsetY = -(e.clientY - centerY) * props.factor
    offsetX.value = newOffsetX
    offsetY.value = newOffsetY
  }

  onMounted(() => {
    boxShadow1.value = generateStars(1000, props.starColor)
    boxShadow2.value = generateStars(400, props.starColor)
    boxShadow3.value = generateStars(200, props.starColor)
  })

  watch(
    () => props.starColor,
    (newColor) => {
      boxShadow1.value = generateStars(1000, newColor)
      boxShadow2.value = generateStars(400, newColor)
      boxShadow3.value = generateStars(200, newColor)
    },
  )

  const starLayer1Transition = computed(() => ({
    repeat: Infinity,
    duration: props.speed,
    ease: 'linear',
  }))

  const starLayer2Transition = computed(() => ({
    repeat: Infinity,
    duration: props.speed * 2,
    ease: 'linear',
  }))

  const starLayer3Transition = computed(() => ({
    repeat: Infinity,
    duration: props.speed * 3,
    ease: 'linear',
  }))

  return {
    offsetX,
    offsetY,
    boxShadow1,
    boxShadow2,
    boxShadow3,
    handleMouseMove,
    starLayer1Transition,
    starLayer2Transition,
    starLayer3Transition,
  }
}
