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
            class="flex justify-center items-center md:h-[295px] w-full h-full rounded-lg overflow-hidden"
            :style="{ backgroundColor: item.bg }"
            to="/products"
        >
            <!-- Видео для ПК -->
            <video
                v-if="item.type === 'video'"
                :key="currentSrc(item, false)"
                :src="currentSrc(item, false)"
                class="hidden md:block rounded-lg max-w-[960px] h-full object-contain"
                muted
                autoplay
                loop
                playsinline
            />

            <!-- Видео для мобильных -->
            <video
                v-if="item.type === 'video'"
                :key="currentSrc(item, true)"
                :src="currentSrc(item, true)"
                class="md:hidden w-full h-full object-cover rounded-lg"
                muted
                autoplay
                loop
                playsinline
            />

            <!-- Изображение для ПК -->
            <img
                v-if="item.type === 'image'"
                :key="currentSrc(item, false)"
                :src="currentSrc(item, false)"
                class="hidden md:block max-h-full max-w-[960px] object-contain"
            />

            <!-- Изображение для мобильных -->
            <img
                v-if="item.type === 'image'"
                :key="currentSrc(item, true)"
                :src="currentSrc(item, true)"
                class="md:hidden w-full h-full object-cover rounded-lg"
            />
        </nuxt-link>
    </UCarousel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const items = [
    {
        type: "video",
        src: "https://indexiq.ru/storage/files/24d697429032697599317ce9aae7f093.mp4",
        srcMobile:
            "https://indexiq.ru/storage/files/981f9700dc815448a9ddac06fcae664b.mp4",
        bg: "#000",
    },
    {
        type: "video",
        src: "https://indexiq.ru/storage/files/00390e35ceb4ddc35f681648cd7e9a30.mp4",
        srcMobile:
            "https://indexiq.ru/storage/files/299df52f7016dfcf02d4a66aa38e6df8.mp4",
        bg: "#f3f3f5",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/5d213586c907690d2b0215b88d22f4b1.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/6d8e207f0fcab849ba80373d64bc0c86.jpg",
        bg: "#e8e8ea",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/ae5b374314a3b7f3bf38118c457c947e.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/7eb395532189280b6c506ceeed9f88ce.jpg",
        bg: "#f8e0dc",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/6bcf3e3f5ad1d2607f38439f73ff9a9d.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/35582eb35807e9255ef9b82cd3a5430e.jpg",
        bg: "#f4f4f4",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/369a43d99273e4b434080b42ed1df4bf.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/4c7be90f8a3d21e917cad74b5717398e.jpg",
        bg: "#fff",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/6fd3826a4986f235c43c0a1ab11ab6c8.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/0339bfdc915a159ad4028aa2e956315a.jpg",
        bg: "#4767ba",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/3852909fdf42148340021ad03f162ff9.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/b3dbb90c95e48a8743655b182bc3d070.jpg",
        bg: "#000",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/03c86a8f3670d69b8c9fc04dce3f5caa.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/9d5334ef0c81a327c12b10fe44a06ab9.jpg",
        bg: "#f4deeb",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/fa1ba9e9d7778f0523b2e863b4e367b5.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/f6d8559b4794162eaa58d0ea938fb29b.jpg",
        bg: "#dbe8f0",
    },
    {
        type: "image",
        src: "https://indexiq.ru/storage/banners/original/73c2e5961547ef610bae3e7142627ebf.jpg",
        srcMobile:
            "https://indexiq.ru/storage/banners/original/adb3dc67044cd0bd69e3fa67a89af2d0.jpg",
        bg: "#1d1d1d",
    },
];

// Функция для определения src
const currentSrc = (item, forMobile = false) => {
    if (forMobile && item.srcMobile) {
        return item.srcMobile;
    }
    return item.src;
};
</script>
