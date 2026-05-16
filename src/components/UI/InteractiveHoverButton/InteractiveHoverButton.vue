<script setup>
import { cn } from "@inspira-ui/plugins";
import { ref } from "vue";

const props = defineProps({
    text: {
        type: String,
        default: "Button",
    },
    class: {
        type: String,
        default: "",
    },
});

const buttonRef = ref(null);
</script>

<template>
    <button ref="buttonRef" :class="cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-xl border-none bg-black/[0.03] dark:bg-white/10 p-2 px-4 text-center font-medium text-[14px] text-current transition-all duration-300 hover:bg-black/[0.06]',
        props.class,
    )">
        <div
            class="flex items-center justify-center gap-2 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
            <div class="bg-gray-400 size-1 rounded-full transition-all duration-300" />
            <span class="inline-block whitespace-nowrap">
                {{ text }}
            </span>
        </div>

        <div
            class="absolute inset-0 z-10 flex items-center justify-center gap-1.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span class="whitespace-nowrap">{{ text }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </div>
    </button>
</template>