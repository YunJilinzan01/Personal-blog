<script setup>
import { motion, useMotionValue, useSpring } from 'motion-v'
import { useStarsBackground } from '@/composables/ui/useStarsBackground'

const props = defineProps({
  factor: {
    type: Number,
    default: 0.05,
  },
  speed: {
    type: Number,
    default: 50,
  },
  transition: {
    type: Object,
    default: () => ({ stiffness: 50, damping: 20 }),
  },
  starColor: {
    type: String,
    default: '#fff',
  },
})

// For slot content
defineSlots()

const offsetX = useMotionValue(1)
const offsetY = useMotionValue(1)
const springX = useSpring(offsetX, props.transition)
const springY = useSpring(offsetY, props.transition)

const {
  boxShadow1,
  boxShadow2,
  boxShadow3,
  handleMouseMove,
  starLayer1Transition,
  starLayer2Transition,
  starLayer3Transition,
} = useStarsBackground(props)
</script>

<template>
  <div class="relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)]"
    @mousemove="handleMouseMove">
    <motion.div :style="{ x: springX, y: springY }">
      <!-- Star Layer 1 -->
      <motion.div class="absolute top-0 left-0 h-[2000px] w-full" :animate="{ y: [0, -2000] }"
        :transition="starLayer1Transition">
        <div class="absolute rounded-full bg-transparent" :style="{
          width: '1px',
          height: '1px',
          boxShadow: boxShadow1,
        }" />
        <div class="absolute top-[2000px] rounded-full bg-transparent" :style="{
          width: '1px',
          height: '1px',
          boxShadow: boxShadow1,
        }" />
      </motion.div>

      <!-- Star Layer 2 -->
      <motion.div class="absolute top-0 left-0 h-[2000px] w-full" :animate="{ y: [0, -2000] }"
        :transition="starLayer2Transition">
        <div class="absolute rounded-full bg-transparent" :style="{
          width: '2px',
          height: '2px',
          boxShadow: boxShadow2,
        }" />
        <div class="absolute top-[2000px] rounded-full bg-transparent" :style="{
          width: '2px',
          height: '2px',
          boxShadow: boxShadow2,
        }" />
      </motion.div>

      <!-- Star Layer 3 -->
      <motion.div class="absolute top-0 left-0 h-[2000px] w-full" :animate="{ y: [0, -2000] }"
        :transition="starLayer3Transition">
        <div class="absolute rounded-full bg-transparent" :style="{
          width: '3px',
          height: '3px',
          boxShadow: boxShadow3,
        }" />
        <div class="absolute top-[2000px] rounded-full bg-transparent" :style="{
          width: '3px',
          height: '3px',
          boxShadow: boxShadow3,
        }" />
      </motion.div>
    </motion.div>

    <!-- Slot for child content -->
    <slot />
  </div>
</template>
