<script setup>
import Orbit from '../UI/Orbit/Orbit.vue'
import { Icon } from '@iconify/vue'

const ORBIT_DIRECTION = {
  Clockwise: 'normal',
  CounterClockwise: 'reverse',
}
</script>

<template>
  <div
    class="w-full lg:w-87.5 p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl mt-4 transition-colors duration-300"
  >
    <div
      class="bg-slate-50 dark:bg-zinc-950 relative flex h-60 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-100 dark:border-zinc-800 md:shadow-xl transition-colors duration-300"
    >
      <Icon icon="vscode-icons:file-type-vscode" width="38" />

      <Orbit
        class="size-5 items-center justify-center border-none bg-transparent"
        :duration="20"
        :delay="20"
        :radius="45"
        :direction="ORBIT_DIRECTION.CounterClockwise"
      >
        <Icon icon="logos:vitejs" width="35" />
      </Orbit>
      <Orbit
        class="size-5 items-center justify-center border-none bg-transparent"
        :duration="20"
        :delay="10"
        :radius="45"
        path
        :direction="ORBIT_DIRECTION.CounterClockwise"
      >
        <Icon icon="logos:vue" width="35" />
      </Orbit>

      <Orbit
        class="size-8 items-center justify-center border-none bg-transparent"
        :radius="75"
        :duration="20"
        :delay="0"
        path
      >
        <Icon icon="logos:github-icon" width="28" />
      </Orbit>
      <Orbit
        class="size-8 items-center justify-center border-none bg-transparent"
        :radius="75"
        :duration="20"
        :delay="6.6"
        :direction="ORBIT_DIRECTION.CounterClockwise"
      >
        <Icon icon="logos:webstorm" width="28" />
      </Orbit>
      <Orbit
        class="size-8 items-center justify-center border-none bg-transparent"
        :radius="75"
        :duration="20"
        :delay="13.3"
      >
        <Icon icon="logos:javascript" width="28" class="pointer-events-none" />
      </Orbit>

      <Orbit
        class="size-8 items-center justify-center border-none bg-transparent"
        :radius="105"
        :duration="20"
        path
      >
        <Icon icon="material-icon-theme:html" width="28" />
      </Orbit>
      <Orbit
        class="size-8 items-center justify-center border-none bg-transparent"
        :radius="105"
        :duration="20"
        :delay="200"
        :direction="ORBIT_DIRECTION.CounterClockwise"
      >
        <Icon icon="devicon:css" width="28" />
      </Orbit>
      <Orbit
        class="size-8 items-center justify-center border-none bg-transparent"
        :radius="105"
        :duration="20"
        :delay="300"
        :direction="ORBIT_DIRECTION.Clockwise"
      >
        <Icon icon="devicon:tailwindcss" width="28" />
      </Orbit>
    </div>
  </div>
</template>
