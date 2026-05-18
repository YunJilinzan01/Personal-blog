<script setup>
import { computed } from "vue";
import { cn } from "@inspira-ui/plugins";


const props = defineProps({
    class: {
        type: String,
        default: "",
    },
    direction: {
        type: String,
        default: "normal",
    },
    duration: {
        type: Number,
        default: 20,
    },
    delay: {
        type: Number,
        default: 10,
    },
    radius: {
        type: Number,
        default: 50,
    },
    path: {
        type: Boolean,
        default: false,
    },
});

const negativeDelay = computed(() => -props.delay);
</script>

<template>
    <svg v-if="path" class="pointer-events-none absolute inset-0 size-full">
        <circle cx="50%" cy="50%" :r="props.radius" fill="none" stroke="rgba(0, 0, 0, 0.1)" stroke-width="1" />
    </svg>
    <div :class="cn(`animate-orbit absolute flex size-full transform-gpu`, props.class)">
        <slot />
    </div>
</template>

<style scoped>
@keyframes orbit {
    0% {
        transform: rotate(0deg) translateY(calc(v-bind(radius) * 1px)) rotate(0deg);
    }

    100% {
        transform: rotate(360deg) translateY(calc(v-bind(radius) * 1px)) rotate(-360deg);
    }
}

.animate-orbit {
    animation: orbit calc(v-bind(duration) * 1s) linear infinite;
    animation-delay: calc(v-bind(negativeDelay) * 1s);
    animation-direction: v-bind(direction);
}
</style>