<template>
    <div class="container mx-auto p-4 max-w-7xl">
        <!-- Хлебные крошки -->
        <nav class="mb-6">
            <ul class="flex items-center space-x-2 text-sm">
                <li>
                    <NuxtLink
                        to="/"
                        class="text-gray-500 hover:text-primary transition-colors"
                    >
                        Главная
                    </NuxtLink>
                </li>
                <li class="text-gray-400">/</li>
                <li>
                    <NuxtLink
                        to="/products"
                        class="text-gray-500 hover:text-primary transition-colors"
                    >
                        Каталог
                    </NuxtLink>
                </li>
                <li class="text-gray-400">/</li>
                <li class="font-semibold text-primary truncate">
                    {{ categoryTitle }}
                </li>
            </ul>
        </nav>

        <!-- Заголовок категории с красивым стилем -->
        <div
            class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6 mb-8"
        >
            <div
                class="relative z-10 flex flex-col md:flex-row items-center justify-between"
            >
                <div class="flex items-center gap-4 mb-4 md:mb-0">
                    <div
                        class="w-20 h-20 bg-white/80 dark:bg-gray-900/80 rounded-xl flex items-center justify-center shadow-lg"
                    >
                        <NuxtImg
                            :src="categoryImage"
                            :alt="categoryTitle"
                            class="w-16 h-16 object-contain"
                        />
                    </div>
                    <div>
                        <h1
                            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                        >
                            {{ categoryTitle }}
                        </h1>
                        <p class="text-gray-600 dark:text-gray-300 mt-2">
                            {{ filteredProducts.length }} из
                            {{ products.length }} товаров
                            <span
                                v-if="isPriceFilterActive"
                                class="text-sm text-primary font-medium"
                            >
                                (с фильтром по цене)
                            </span>
                        </p>
                    </div>
                </div>
                <UButton
                    variant="ghost"
                    icon="i-heroicons-arrow-left"
                    @click="navigateTo('/products')"
                    class="bg-white/80 dark:bg-gray-900/80"
                >
                    Назад к каталогу
                </UButton>
            </div>
            <!-- Декоративные элементы -->
            <div
                class="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl"
            ></div>
            <div
                class="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-primary/5 blur-2xl"
            ></div>
        </div>

        <!-- Прелоадер -->
        <div
            v-if="pending"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <div v-for="n in 8" :key="n" class="animate-pulse">
                <div
                    class="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden"
                >
                    <div class="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                    <div class="p-4 space-y-3">
                        <div
                            class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"
                        ></div>
                        <div
                            class="h-4 bg-gray-300 dark:bg-gray-700 rounded"
                        ></div>
                        <div
                            class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"
                        ></div>
                    </div>
                    <div class="p-4 pt-0 flex gap-2">
                        <div
                            class="flex-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"
                        ></div>
                        <div
                            class="flex-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Нет товаров -->
        <div v-else-if="products.length === 0" class="text-center py-16">
            <div class="w-32 h-32 mx-auto mb-6 relative">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 rounded-full blur-xl"
                ></div>
                <UIcon
                    name="i-heroicons-inbox"
                    class="w-32 h-32 text-gray-400 relative z-10"
                />
            </div>
            <h2 class="text-2xl font-bold mb-2">
                В этой категории пока нет товаров
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Мы работаем над пополнением ассортимента. Скорее всего, скоро
                здесь появятся новые товары!
            </p>
            <UButton
                @click="navigateTo('/products')"
                color="primary"
                size="lg"
                class="shadow-lg shadow-primary/20"
            >
                Перейти в каталог
            </UButton>
        </div>

        <!-- Товары -->
        <div v-else>
            <!-- Панель управления: фильтры и сортировка -->
            <div class="sticky top-4 z-10 mb-8">
                <div
                    class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4"
                >
                    <div
                        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                        <!-- Сортировка -->
                        <div
                            class="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1"
                        >
                            <div class="flex items-center gap-2">
                                <UIcon
                                    name="i-heroicons-arrows-up-down"
                                    class="w-5 h-5 text-gray-500"
                                />
                                <span
                                    class="font-medium text-gray-700 dark:text-gray-300"
                                    >Сортировка:</span
                                >
                            </div>
                            <div class="grid grid-cols-2 sm:flex gap-2">
                                <UButton
                                    v-for="option in sortOptions"
                                    :key="option.value"
                                    :variant="
                                        sortBy === option.value
                                            ? 'solid'
                                            : 'ghost'
                                    "
                                    :color="
                                        sortBy === option.value
                                            ? 'primary'
                                            : 'gray'
                                    "
                                    size="sm"
                                    @click="sortBy = option.value"
                                    class="transition-all duration-200"
                                >
                                    {{ option.label }}
                                </UButton>
                            </div>
                        </div>

                        <!-- Фильтр по цене -->
                        <div
                            class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        >
                            <div class="flex items-center gap-2">
                                <UIcon
                                    name="i-heroicons-currency-ruble"
                                    class="w-5 h-5 text-gray-500"
                                />
                                <span
                                    class="font-medium text-gray-700 dark:text-gray-300"
                                    >Цена:</span
                                >
                            </div>
                            <div class="flex items-center gap-2">
                                <UInput
                                    v-model="minPrice"
                                    placeholder="0"
                                    type="number"
                                    size="sm"
                                    class="w-28"
                                    :ui="{
                                        base: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700',
                                        padding: { sm: 'px-3 py-2' },
                                    }"
                                />
                                <span class="text-gray-400">—</span>
                                <UInput
                                    v-model="maxPrice"
                                    placeholder="∞"
                                    type="number"
                                    size="sm"
                                    class="w-28"
                                    :ui="{
                                        base: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700',
                                        padding: { sm: 'px-3 py-2' },
                                    }"
                                />
                                <UButton
                                    size="sm"
                                    color="primary"
                                    :disabled="!isPriceFilterActive"
                                    @click="applyPriceFilter"
                                    class="shadow-md shadow-primary/20"
                                >
                                    Применить
                                </UButton>
                                <UButton
                                    v-if="isPriceFilterActive"
                                    size="sm"
                                    variant="ghost"
                                    color="gray"
                                    @click="resetPriceFilter"
                                >
                                    Сбросить
                                </UButton>
                            </div>
                        </div>
                    </div>

                    <!-- Информация о текущих фильтрах -->
                    <div
                        v-if="isPriceFilterActive"
                        class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
                    >
                        <div class="flex items-center gap-2 text-sm">
                            <UIcon
                                name="i-heroicons-funnel"
                                class="w-4 h-4 text-primary"
                            />
                            <span class="text-gray-600 dark:text-gray-400"
                                >Активные фильтры:</span
                            >
                            <UBadge v-if="minPrice" color="blue" variant="soft">
                                От {{ formatPrice(Number(minPrice)) }}
                            </UBadge>
                            <UBadge v-if="maxPrice" color="blue" variant="soft">
                                До {{ formatPrice(Number(maxPrice)) }}
                            </UBadge>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Сетка товаров -->
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <div
                    v-for="product in filteredProducts"
                    :key="product.id"
                    class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 relative"
                >
                    <!-- Бейдж новинки -->
                    <div
                        v-if="isNewProduct(product)"
                        class="absolute top-3 left-3 z-20"
                    >
                        <div
                            class="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                        >
                            NEW
                        </div>
                    </div>

                    <!-- Изображение -->
                    <div
                        @click="navigateTo(`/products/${product.id}`)"
                        class="cursor-pointer relative overflow-hidden bg-gray-50 dark:bg-gray-800"
                    >
                        <div class="relative pt-[75%]">
                            <NuxtImg
                                v-if="getFirstImage(product.images)"
                                :src="getFirstImage(product.images)"
                                :alt="product.name"
                                class="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div
                                v-else
                                class="absolute inset-0 flex items-center justify-center"
                            >
                                <UIcon
                                    name="i-heroicons-photo"
                                    class="w-16 h-16 text-gray-400 dark:text-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Информация о товаре -->
                    <div class="p-4">
                        <!-- Цена -->
                        <div class="flex items-center justify-between mb-3">
                            <p class="text-2xl font-bold text-primary">
                                {{ formatPrice(product.price) }}
                            </p>
                            <UButton
                                :icon="
                                    isInFavorites(product.id)
                                        ? 'i-heroicons-heart-20-solid'
                                        : 'i-heroicons-heart'
                                "
                                :color="
                                    isInFavorites(product.id) ? 'red' : 'gray'
                                "
                                size="xs"
                                variant="ghost"
                                @click.stop="handleToggleFavorite(product)"
                                :loading="favoriteActionLoading === product.id"
                                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>

                        <!-- Название -->
                        <h3
                            @click="navigateTo(`/products/${product.id}`)"
                            class="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                        >
                            {{ product.name }}
                        </h3>

                        <!-- Описание -->
                        <p
                            class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4"
                        >
                            {{ product.description }}
                        </p>

                        <!-- Кнопки действий -->
                        <div class="flex gap-2 mt-4">
                            <UButton
                                v-if="!isInCart(product.id)"
                                icon="i-heroicons-shopping-cart"
                                color="primary"
                                class="flex-1 cursor-pointer shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                @click.stop="handleAddToCart(product)"
                            >
                                В корзину
                            </UButton>

                            <UButton
                                v-else
                                icon="i-heroicons-shopping-bag"
                                color="primary"
                                variant="solid"
                                class="flex-1 cursor-pointer"
                                @click.stop="navigateTo('/cart')"
                            >
                                В корзине
                            </UButton>

                            <UButton
                                :icon="
                                    isInFavorites(product.id)
                                        ? 'i-heroicons-heart-20-solid'
                                        : 'i-heroicons-heart'
                                "
                                :color="
                                    isInFavorites(product.id) ? 'red' : 'gray'
                                "
                                variant="outline"
                                @click.stop="handleToggleFavorite(product)"
                                :loading="favoriteActionLoading === product.id"
                                class="md:hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Пагинация -->
            <div v-if="totalPages > 1" class="mt-12 flex justify-center">
                <div
                    class="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-800"
                >
                    <UPagination
                        v-model="currentPage"
                        :page-count="pageSize"
                        :total="getTotalFilteredCount()"
                        :ui="{
                            wrapper: 'flex items-center gap-1',
                            base: 'w-10 h-10 flex items-center justify-center rounded-lg',
                            rounded: 'rounded-lg',
                            default: {
                                activeButton: {
                                    variant: 'solid',
                                    color: 'primary',
                                },
                                inactiveButton: {
                                    variant: 'ghost',
                                    color: 'gray',
                                },
                            },
                        }"
                        @update:model-value="goToPage"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { $supabase } = useNuxtApp();

// Параметры из URL
const categoryId = route.params.id;
const categoryName = route.query.name;

// Состояние
const pending = ref(true);
const products = ref([]);
const favoriteActionLoading = ref(null);

// Фильтры и сортировка
const sortBy = ref("newest");
const minPrice = ref("");
const maxPrice = ref("");
const currentPage = ref(1);
const pageSize = ref(12);

// Инициализируем избранное и корзину
const { isInFavorites, toggleFavorite, loadFavorites } = useFavorites();
const { addToCart, cart, isInCart } = useCart();

// Опции сортировки
const sortOptions = [
    { value: "newest", label: "Сначала новые" },
    { value: "price_asc", label: "Цена по возрастанию" },
    { value: "price_desc", label: "Цена по убыванию" },
    { value: "name_asc", label: "По названию (А-Я)" },
    { value: "name_desc", label: "По названию (Я-А)" },
];

// Заголовок категории
const categoryTitle = computed(() => {
    const categoriesMap = {
        smartphones: "Смартфоны",
        tablets: "Планшеты",
        laptops: "Ноутбуки и ПК",
        smartwatches: "Умные часы",
        consoles: "Игровые приставки",
        tvs: "Телевизоры",
    };
    return categoriesMap[categoryId] || categoryName || "Категория";
});

// Картинка категории
const categoryImage = computed(() => {
    const imagesMap = {
        smartphones: "/phones.png",
        tablets: "/tablets.png",
        laptops: "/PCs.png",
        smartwatches: "/watch.png",
        consoles: "/consoles.png",
        tvs: "/TVS.png",
    };
    return imagesMap[categoryId] || "/placeholder.jpg";
});

// Загружаем данные
onMounted(async () => {
    try {
        await Promise.all([loadFavorites(), loadProducts()]);
    } catch (error) {
        console.error("Ошибка загрузки:", error);
    } finally {
        pending.value = false;
    }
});

// Загрузка товаров категории
const loadProducts = async () => {
    try {
        let query = $supabase
            .from("products")
            .select("*")
            .eq("is_published", true);

        // Фильтруем по категории
        if (categoryName) {
            query = query.eq("category", categoryName);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Ошибка загрузки товаров:", error);
            throw error;
        }

        products.value = data || [];
        // Инициализируем сортировку
        sortProducts();
    } catch (error) {
        console.error("Ошибка:", error);
        products.value = [];
    }
};

// Функция сортировки
const sortProducts = () => {
    switch (sortBy.value) {
        case "newest":
            products.value.sort((a, b) => {
                const dateA = a.created_at
                    ? new Date(a.created_at)
                    : new Date(0);
                const dateB = b.created_at
                    ? new Date(b.created_at)
                    : new Date(0);
                return dateB.getTime() - dateA.getTime();
            });
            break;
        case "price_asc":
            products.value.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case "price_desc":
            products.value.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
        case "name_asc":
            products.value.sort((a, b) =>
                (a.name || "").localeCompare(b.name || "")
            );
            break;
        case "name_desc":
            products.value.sort((a, b) =>
                (b.name || "").localeCompare(a.name || "")
            );
            break;
    }
};

// Отфильтрованные товары (с пагинацией)
const filteredProducts = computed(() => {
    let result = [...products.value];

    // Фильтрация по цене
    if (minPrice.value || maxPrice.value) {
        const min = minPrice.value ? Number(minPrice.value) : 0;
        const max = maxPrice.value ? Number(maxPrice.value) : Infinity;

        result = result.filter((product) => {
            const price = product.price || 0;
            return price >= min && price <= max;
        });
    }

    // Применяем сортировку
    sortProducts();

    // Пагинация
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return result.slice(start, end);
});

// Общее количество отфильтрованных товаров
const getTotalFilteredCount = () => {
    if (minPrice.value || maxPrice.value) {
        const min = minPrice.value ? Number(minPrice.value) : 0;
        const max = maxPrice.value ? Number(maxPrice.value) : Infinity;

        return products.value.filter((product) => {
            const price = product.price || 0;
            return price >= min && price <= max;
        }).length;
    }
    return products.value.length;
};

// Вспомогательные функции
const getFirstImage = (images) => {
    if (!images) return null;
    if (Array.isArray(images)) return images[0];
    if (typeof images === "string") {
        // Обработка строки изображений
        try {
            // Попробуем разобрать как JSON
            const parsed = JSON.parse(images);
            if (Array.isArray(parsed)) return parsed[0];
            if (typeof parsed === "string") return parsed;
        } catch {
            // Если не JSON, то как строка с разделителями
            const imageArray = images.split(",").map((img) => img.trim());
            return imageArray[0] || null;
        }
    }
    return null;
};

const formatPrice = (price) => {
    if (!price && price !== 0) return "Цена не указана";
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
    }).format(price);
};

// Проверка новизны товара (например, добавлен в течение последних 30 дней)
const isNewProduct = (product) => {
    if (!product.created_at) return false;
    const createdDate = new Date(product.created_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate > thirtyDaysAgo;
};

// Обработчик избранного
const handleToggleFavorite = async (product) => {
    favoriteActionLoading.value = product.id;
    try {
        await toggleFavorite(product);
    } catch (error) {
        console.error("Ошибка при работе с избранным:", error);
    } finally {
        favoriteActionLoading.value = null;
    }
};

// Обработчик корзины
const handleAddToCart = (product) => {
    addToCart(product, 1);
    useToast().add({
        title: "Товар добавлен в корзину",
        description: product.name,
        color: "primary",
        timeout: 2000,
        icon: "i-heroicons-check-circle",
    });
};

// Фильтрация по цене
const isPriceFilterActive = computed(() => {
    return minPrice.value !== "" || maxPrice.value !== "";
});

const applyPriceFilter = () => {
    currentPage.value = 1;
};

const resetPriceFilter = () => {
    minPrice.value = "";
    maxPrice.value = "";
    currentPage.value = 1;
};

// Пагинация
const totalPages = computed(() => {
    return Math.ceil(getTotalFilteredCount() / pageSize.value);
});

const goToPage = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Следим за изменениями сортировки
watch(sortBy, () => {
    currentPage.value = 1;
    sortProducts();
});

// Следим за изменениями в route
watch(
    () => route.params.id,
    async (newId) => {
        if (newId) {
            pending.value = true;
            await loadProducts();
            pending.value = false;
        }
    }
);

// Следим за изменениями фильтров цены
watch(
    [minPrice, maxPrice],
    () => {
        currentPage.value = 1;
    },
    { deep: true }
);
</script>

<style scoped>
/* Плавные анимации */
.card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Обрезка текста */
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Кастомные тени */
.shadow-custom {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.dark .shadow-custom {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
</style>
