<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import InteractiveHoverButton from '../UI/InteractiveHoverButton/InteractiveHoverButton.vue';

const searchQuery = ref('');
const isSearchHover = ref(false);
const isDark = ref(false);
const headerRef = ref(null);
const isHeaderTop = ref(true);

const hideNav = computed(() => isSearchHover.value || searchQuery.value.trim().length > 0);
const isExpanded = computed(() => isSearchHover.value || searchQuery.value.trim().length > 0);

const updateHeaderPosition = () => {
    const header = headerRef.value;
    if (!header) return;

    const width = 1220;
    const left = Math.max((window.innerWidth - width) / 2, 0);

    header.style.position = 'fixed';
    header.style.left = `${left}px`;
    header.style.width = `${width}px`;
    header.style.zIndex = '50';
    header.style.transition = 'top 0.3s ease, left 0.3s ease, background-color 0.2s ease';
};

const handleScroll = () => {
    const header = headerRef.value;
    if (!header) return;

    const scrollY = window.scrollY;
    header.style.top = scrollY > 380 ? '-100px' : '0px';
    isHeaderTop.value = scrollY < 34;

    const alpha = Math.min((scrollY / 100) * 0.5, 0.5);
    header.style.backgroundColor = `rgba(255,255,255,${alpha})`;
    header.style.boxShadow = scrollY === 0 ? 'none' : '0 24px 80px rgba(15, 23, 42, 0.05)';
};

onMounted(() => {
    updateHeaderPosition();
    handleScroll();
    window.addEventListener('resize', updateHeaderPosition);
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateHeaderPosition);
    window.removeEventListener('scroll', handleScroll);
});

const toggleTheme = () => {
    isDark.value = !isDark.value;

};
</script>

<template>
    <header ref="headerRef"
        :class="['bg-white/90 backdrop-blur-md mt-2.5 h-17 rounded-2xl px-4 flex justify-between items-center transition-all duration-300 ', isHeaderTop ? 'text-white' : 'text-gray-800 dark:text-white']">

        <div class="shrink-0">
            <h1 class="text-xl font-bold cursor-pointer">个人博客</h1>
        </div>

        <div class="flex-1 transition-all duration-500 ease-in-out"
            :class="[hideNav ? 'opacity-0 invisible pointer-events-none translate-y-2' : 'opacity-100 visible translate-y-0']">
            <nav>
                <ul class="flex gap-2 justify-center items-center">
                    <li>
                        <InteractiveHoverButton text="首页" class="px-4 py-2" />
                    </li>
                    <li>
                        <InteractiveHoverButton text="文章" class="px-4 py-2" />
                    </li>
                    <li>
                        <InteractiveHoverButton text="关于我" class="px-4 py-2" />
                    </li>
                </ul>
            </nav>
        </div>

        <div class="flex items-center gap-3">
            <div class="flex items-center  cursor-pointer bg-black/5 dark:bg-white/10 rounded-xl px-3 py-1.5 transition-all duration-500 ease-in-out"
                :class="[isExpanded ? 'w-64' : 'w-10']" @mouseenter="isSearchHover = true"
                @mouseleave="isSearchHover = false">
                <div class="shrink-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="text-current">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                </div>
                <input type="text" placeholder="Search" v-model="searchQuery"
                    class="bg-transparent text-sm outline-none transition-all duration-500 ease-in-out placeholder:text-gray-400"
                    :class="[isExpanded ? 'w-full ml-3 opacity-100' : 'w-0 opacity-0']" />
            </div>

            <div class="flex items-center gap-3 ml-2 text-current">
                <button class="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <button @click="toggleTheme"
                    class="p-2 hover:bg-black/5 rounded-full transition-all duration-300 active:scale-90 cursor-pointer">
                    <transition name="scale" mode="out-in">
                        <svg v-if="isDark" :key="'moon'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>

                        <svg v-else :key="'sun'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                    </transition>
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.8) rotate(-45deg);
}
</style>