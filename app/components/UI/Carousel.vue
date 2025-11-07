<script setup lang="ts">
const items = [
    {
        type: "video",
        src: "https://indexiq.ru/storage/files/24d697429032697599317ce9aae7f093.mp4",
        bg: "#000",
    },
    {
        type: "video",
        src: "https://indexiq.ru/storage/files/00390e35ceb4ddc35f681648cd7e9a30.mp4",
        bg: "#f3f3f5",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/5d213586c907690d2b0215b88d22f4b1.jpg",
        bg: "#e8e8ea",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/ae5b374314a3b7f3bf38118c457c947e.jpg",
        bg: "#f8e0dc",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/6bcf3e3f5ad1d2607f38439f73ff9a9d.jpg",
        bg: "#f4f4f4",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/369a43d99273e4b434080b42ed1df4bf.jpg",
        bg: "#fff",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/6fd3826a4986f235c43c0a1ab11ab6c8.jpg",
        bg: "#4767ba",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/3852909fdf42148340021ad03f162ff9.jpg",
        bg: "#000",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/03c86a8f3670d69b8c9fc04dce3f5caa.jpg",
        bg: "#f4deeb",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/fa1ba9e9d7778f0523b2e863b4e367b5.jpg",
        bg: "#dbe8f0",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/73c2e5961547ef610bae3e7142627ebf.jpg",
        bg: "#1d1d1d",
    },
];
</script>

<template>
    <UCarousel
        v-slot="{ item }"
        loop
        arrows
        dots
        :autoplay="{ delay: 10000 }"
        :items="items"
        class="w-full mx-auto"
    >
        <nuxt-link
            class="flex justify-center items-center h-[295px] w-full rounded-lg overflow-hidden"
            :style="{ backgroundColor: item.bg }"
            to="/products"
        >
            <video
                v-if="item.type === 'video'"
                :src="item.src"
                class="rounded-lg max-w-[960px] h-full object-contain"
                muted
                autoplay
                loop
                playsinline
            />
            <img
                v-else
                :src="item.src"
                class="max-h-full max-w-[960px] object-contain"
            />
        </nuxt-link>
    </UCarousel>
</template>
