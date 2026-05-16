<script setup>
import VueIcon from '../icons/VueIcon.vue';
import ViteIcon from '../icons/ViteIcon.vue';
import JSIcon from '../icons/JSIcon.vue';
import TWCIcon from '../icons/TWCIcon.vue';
import GitHubIcon from '../icons/GitHubIcon.vue';
</script>

<template>
    <div class=" flex flex-1 justify-center  gap-5">
        <aside>
            <div class="w-87.5 p-3 bg-white/80 rounded-xl ">
                <div class="w-full h-75 bg-blue-400 rounded-xl">
                    <img src="../../assets/images/author.jpg" alt="Author"
                        class="w-full h-full object-cover rounded-xl">
                </div>
                <h4 class="text-2xl font-bold my-4 text-center">YunJilinzan</h4>
                <p class="text-gray-600 text-center">
                    你好！我是一个热爱编程的开发者，喜欢分享我的技术经验和生活点滴。</p>
                <div class="mt-4 flex  gap-2 text-gray-600">
                    <div
                        class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
                        <GitHubIcon></GitHubIcon>
                    </div>
                    <div
                        class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
                        <VueIcon></VueIcon>
                    </div>
                    <div
                        class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
                        <ViteIcon></ViteIcon>
                    </div>
                    <div
                        class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
                        <JSIcon></JSIcon>
                    </div>
                    <div
                        class="size-10 bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer flex items-center justify-center">
                        <TWCIcon></TWCIcon>
                    </div>
                </div>
            </div>

            <div class="w-87.5 p-3 bg-white/80 rounded-xl mt-4 ">
                <div class="text-2xl font-bold mb-4">
                    标签
                </div>
                <div class="flex flex-wrap gap-2">
                    <span
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm cursor-pointer hover:bg-gray-400">JavaScript</span>
                    <span
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm cursor-pointer hover:bg-gray-400">Vue.js</span>
                    <span
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm cursor-pointer hover:bg-gray-400">CSS</span>
                    <span
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm cursor-pointer hover:bg-gray-400">前端开发</span>
                    <span
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm cursor-pointer hover:bg-gray-400">编程</span>
                </div>
            </div>
            <div class="w-87.5 p-3 bg-white/80 rounded-xl mt-4">
                <div class="text-2xl font-bold mb-4">
                    目录
                </div>
                <div class="flex flex-wrap gap-2">
                    <a href="#latest-articles"
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm hover:bg-gray-400">最新文章</a>
                    <a href="#web-development"
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm hover:bg-gray-400">前端开发</a>
                    <a href="#vue-tips"
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm hover:bg-gray-400">Vue
                        技巧</a>
                    <a href="#css-tricks"
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm hover:bg-gray-400">CSS
                        效果</a>
                    <a href="#project-showcase"
                        class="text-white px-3 font-bold py-2 bg-gray-500 rounded-lg text-sm hover:bg-gray-400">作品展示</a>
                </div>
            </div>
        </aside>
        <main class="flex-1 bg-pink-200 rounded-xl">
            <h1 class="text-4xl font-bold">欢迎来到我的个人博客！</h1>
            <p class="mt-4 text-lg text-gray-600">在这里，我将分享我的编程之旅、技术见解和生活点滴。无论你是开发者还是技术爱好者，都欢迎加入我的博客，一起探索编程的世界！</p>
        </main>
        <section class="w-80 bg-orange-600 rounded-xl">
            <h2 class="text-3xl font-bold mb-4">联系我</h2>
            <p class="text-gray-600">如果你有任何问题、建议或者想要交流技术，欢迎通过以下方式联系我：</p>
            <ul class="mt-4 text-gray-600">
                <li>Email:
                    <a href="mailto:your-email@example.com"
                        class="text-blue-500 hover:underline">your-email@example.com</a>
                </li>
            </ul>
        </section>
    </div>
</template>