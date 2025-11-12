<template>
    <div class="">
        <ul class="grid grid-cols-6 grid-rows-2 gap-4">
            <li v-for="item in items" :key="item" class="bg-[var(--category-item-bg)] flex items-center justify-center rounded-lg pt-2 pb-2 pl-4 pr-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200">
                <NuxtImg :src="item.img" class="w-[84px] h-[84px]"/>
                <span>{{ item.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const items = [
    {   
        title: 'Смартфоны',
        img: "/phones.png",
        src: "#",
    },
    {
        title: 'Планшеты',
        img: "/tablets.png",
        src: "#",
    },
    {
        title: 'Ноутбуки и ПК',
        img: "/PCs.png",
        src: "#",
    },
    {
        title: 'Умные часы',
        img: "/watch.png",
        src: "#",
    },
    {
        title: 'Игровые приставки',
        img: "/consoles.png",
        src: "#",
    },
    {
        title: 'Телевизоры',
        img: "/TVS.png",
        src: "#",
    },
];
</script>
