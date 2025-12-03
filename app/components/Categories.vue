<template>
    <div>
        <ul class="grid grid-cols-6 grid-rows-2 gap-4">
            <li
                v-for="item in categoryItems"
                :key="item.id"
                class="bg-[var(--category-item-bg)] flex items-center justify-center rounded-lg pt-2 pb-2 pl-4 pr-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200 group"
                @click="navigateToCategory(item)"
            >
                <NuxtImg
                    :src="item.img"
                    :alt="item.title"
                    class="w-[84px] h-[84px] transition-transform duration-300 group-hover:scale-110"
                />
                <span class="ml-3 font-medium text-lg">{{ item.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const router = useRouter();

// Карта категорий с корректными названиями, соответствующими базе данных
const categoryItems = [
    {
        id: "smartphones",
        title: "Смартфоны",
        img: "/phones.png",
        categoryName: "Смартфоны", // Как хранится в базе данных
    },
    {
        id: "tablets",
        title: "Планшеты",
        img: "/tablets.png",
        categoryName: "Планшеты",
    },
    {
        id: "laptops",
        title: "Ноутбуки и ПК",
        img: "/PCs.png",
        categoryName: "Ноутбуки",
    },
    {
        id: "smartwatches",
        title: "Умные часы",
        img: "/watch.png",
        categoryName: "Часы",
    },
    {
        id: "consoles",
        title: "Игровые приставки",
        img: "/consoles.png",
        categoryName: "Игровые приставки",
    },
    {
        id: "tvs",
        title: "Телевизоры",
        img: "/TVS.png",
        categoryName: "Телевизоры",
    },
];

// Навигация на страницу категории
const navigateToCategory = (category) => {
    router.push({
        path: `/categories/${category.id}`,
        query: { name: category.categoryName },
    });
};
</script>
