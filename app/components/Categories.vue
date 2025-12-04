<template>
    <div>
        <ul class="flex flex-wrap justify-center gap-3 sm:gap-4">
            <li
                v-for="item in categoryItems"
                :key="item.id"
                class="bg-[var(--category-item-bg)] flex items-center rounded-lg p-3 sm:p-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200 group w-full sm:w-auto overflow-hidden"
                :style="itemStyle"
                @click="navigateToCategory(item)"
            >
                <div class="flex-shrink-0">
                    <NuxtImg
                        :src="item.img"
                        :alt="item.title"
                        class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px] transition-transform duration-300 group-hover:scale-110 object-contain"
                        :width="84"
                        :height="84"
                        loading="lazy"
                    />
                </div>
                <div class="ml-3 min-w-0 flex-1">
                    <span
                        class="font-medium text-sm sm:text-base md:text-lg truncate block"
                    >
                        {{ item.title }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const router = useRouter();

// Рассчитываем стили для элементов
const itemStyle = computed(() => {
    return {
        "flex-basis": "calc(50% - 0.75rem)",
        "max-width": "calc(50% - 0.75rem)",
    };
});

// Карта категорий с корректными названиями, соответствующими базе данных
const categoryItems = [
    {
        id: "smartphones",
        title: "Смартфоны",
        img: "/phones.png",
        categoryName: "Смартфоны",
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

<style scoped>
/* Базовые стили для контейнера */
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    width: 100%;
}

/* Общие стили для элементов */
li {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    min-height: 80px;
}

/* Гарантируем, что контент не выходит за пределы */
li > * {
    max-width: 100%;
}

/* Для очень маленьких экранов */
@media (max-width: 360px) {
    li {
        padding: 0.5rem !important;
        min-height: 70px;
    }

    .text-sm {
        font-size: 0.75rem;
    }

    .w-12,
    .h-12 {
        width: 2.5rem;
        height: 2.5rem;
    }
}

/* Адаптивные размеры для разных экранов */
@media (max-width: 639px) {
    li {
        flex: 0 0 calc(50% - 0.75rem) !important;
        max-width: calc(50% - 0.75rem) !important;
        margin: 0.375rem;
    }
}

@media (min-width: 640px) and (max-width: 767px) {
    li {
        flex: 0 0 calc(33.333% - 1rem) !important;
        max-width: calc(33.333% - 1rem) !important;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    li {
        flex: 0 0 calc(25% - 1rem) !important;
        max-width: calc(25% - 1rem) !important;
    }
}

@media (min-width: 1024px) and (max-width: 1279px) {
    li {
        flex: 0 0 calc(20% - 1rem) !important;
        max-width: calc(20% - 1rem) !important;
    }
}

@media (min-width: 1280px) {
    li {
        flex: 0 0 calc(16.666% - 1rem) !important;
        max-width: calc(16.666% - 1rem) !important;
    }
}

/* Специальные стили для длинных текстов */
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 100%;
}

/* Обертка для текста с минимальной шириной 0 для правильного truncate */
.min-w-0 {
    min-width: 0;
}

/* Улучшение для тач-устройств */
@media (hover: none) and (pointer: coarse) {
    .hover\:-translate-y-1:hover {
        transform: none;
    }

    .group-hover\:scale-110:hover {
        transform: none;
    }

    li {
        min-height: 60px;
    }
}

/* Объект-контейнер для изображений */
.object-contain {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
}

/* Предотвращаем растягивание изображений */
.flex-shrink-0 {
    flex-shrink: 0;
}

/* Гарантируем, что flex-контейнер работает правильно */
.flex-1 {
    flex: 1 1 0%;
}
</style>
