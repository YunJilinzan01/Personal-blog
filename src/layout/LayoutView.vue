<script setup>
import HeaderView from '@/components/header/HeaderView.vue';
import MianView from '@/components/main/MianView.vue';
import StarsBackground from '@/components/UI/StarsBackground/StarsBackground.vue';
</script>

<template>


    <div
        class="relative flex  w-full flex-col items-center justify-center gap-4 overflow-clip border transition-all duration-150  border-zinc-800">
        <StarsBackground :factor="0.05" :speed="50" star-color="#fff" class="flex justify-center ">
            <div class="w-full max-w-350 px-4">
                <div>
                    <div class="header flex justify-center  ">
                        <HeaderView class="shadow-xl"></HeaderView>
                    </div>
                    <div class="main pt-87.5">
                        <MianView>
                        </MianView>
                    </div>
                </div>
            </div>
        </StarsBackground>
    </div>

</template>