<script setup>
import AuthorProfile from '../aside/AuthorProfile.vue';
import TagCloud from '../aside/TagCloud.vue';
import TechOrbit from '../aside/TechOrbit.vue';
import Directory from '../aside/Directory.vue';
</script>

<template>
    <div class=" flex flex-1 justify-center gap-5 ">
        <aside>
            <AuthorProfile />
            <TagCloud />
            <TechOrbit />
            <Directory />
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