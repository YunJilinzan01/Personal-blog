<script setup>
import { useTemplateRef, onMounted, ref } from "vue";
import AnimatedBeam from "./components/AnimatedBeam.vue";
import { Icon } from "@iconify/vue";

const isLoaded = ref(false);

const containerRef = useTemplateRef("containerRef");
const div1Ref = useTemplateRef("div1Ref");
const div2Ref = useTemplateRef("div2Ref");
const div3Ref = useTemplateRef("div3Ref");
const div4Ref = useTemplateRef("div4Ref");
const div5Ref = useTemplateRef("div5Ref");
const div6Ref = useTemplateRef("div6Ref");
const div7Ref = useTemplateRef("div7Ref");

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 200);
});
</script>

<template>
  <div class="w-full  flex justify-center items-center">
    <div ref="containerRef"
      class=" relative flex h-[500px] w-[800px] items-center justify-center overflow-hidden rounded-lg border bg-slate-50 p-10 bg-red-600">

      <div class="z-20 flex w-full max-w-lg flex-col gap-10 ">

        <div class="flex justify-between">
          <div ref="div1Ref" class="flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-md">
            <Icon icon="devicon:googlecloud" width="24" height="24" />
          </div>
          <div ref="div5Ref" class="flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-md">
            <Icon icon="logos:google-drive" width="24" height="24" />
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div ref="div2Ref" class="flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-md">
            <Icon icon="logos:notion-icon" width="24" height="24" />
          </div>

          <div ref="div4Ref"
            class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-500 bg-white shadow-xl">
            <Icon icon="simple-icons:openai" width="32" height="32" class="text-black" />
          </div>

          <div ref="div6Ref" class="flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-md">
            <Icon icon="logos:google-gmail" width="24" height="24" />
          </div>
        </div>

        <div class="flex justify-between">
          <div ref="div3Ref" class="flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-md">
            <Icon icon="logos:whatsapp-icon" width="24" height="24" />
          </div>
          <div ref="div7Ref" class="flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-md">
            <Icon icon="logos:messenger" width="24" height="24" />
          </div>
        </div>
      </div>

      <template v-if="isLoaded">
        <AnimatedBeam class="z-10" :container-ref="containerRef" :from-ref="div1Ref" :to-ref="div4Ref" :curvature="-75"
          :end-y-offset="-10" />
        <AnimatedBeam class="z-10" :container-ref="containerRef" :from-ref="div2Ref" :to-ref="div4Ref" />
        <AnimatedBeam class="z-10" :container-ref="containerRef" :from-ref="div3Ref" :to-ref="div4Ref" :curvature="75"
          :end-y-offset="10" />
        <AnimatedBeam class="z-10" :container-ref="containerRef" :from-ref="div5Ref" :to-ref="div4Ref" :curvature="-75"
          :end-y-offset="-10" />
        <AnimatedBeam class="z-10" :container-ref="containerRef" :from-ref="div6Ref" :to-ref="div4Ref" />
        <AnimatedBeam class="z-10" :container-ref="containerRef" :from-ref="div7Ref" :to-ref="div4Ref" :curvature="75"
          :end-y-offset="10" />
      </template>
    </div>
  </div>
</template>