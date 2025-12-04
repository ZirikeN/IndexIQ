<template>
    <div class="container mx-auto p-3 sm:p-4 max-w-7xl">
        <!-- Кнопка назад -->
        <UButton
            variant="ghost"
            icon="i-heroicons-arrow-left"
            @click="navigateTo('/products')"
            class="mb-4 sm:mb-6 text-sm sm:text-base"
            size="sm"
        >
            Назад к каталогу
        </UButton>

        <!-- Прелоадер для страницы товара -->
        <div
            v-if="pending"
            class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
        >
            <!-- Прелоадер для изображений -->
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <!-- Миниатюры (только на больших экранах) -->
                <div
                    class="hidden sm:flex flex-col space-y-2 sm:space-y-3 w-20 sm:w-24 flex-shrink-0"
                >
                    <div
                        v-for="n in 4"
                        :key="n"
                        class="w-full h-16 sm:h-20 bg-gray-300 dark:bg-gray-700 rounded-lg sm:rounded-xl animate-pulse"
                    ></div>
                </div>
                <!-- Основное изображение -->
                <div class="flex-1">
                    <div
                        class="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-300 dark:bg-gray-700 rounded-xl sm:rounded-2xl animate-pulse"
                    ></div>
                </div>
            </div>

            <!-- Прелоадер для информации -->
            <div class="space-y-4 sm:space-y-6 lg:space-y-8">
                <div class="space-y-3 sm:space-y-4">
                    <div
                        class="h-6 sm:h-8 lg:h-10 bg-gray-300 dark:bg-gray-700 rounded-lg sm:rounded-xl animate-pulse"
                    ></div>
                    <div
                        class="h-8 sm:h-10 lg:h-12 bg-gray-300 dark:bg-gray-700 rounded-lg sm:rounded-xl animate-pulse"
                    ></div>
                </div>

                <div class="space-y-2 sm:space-y-3">
                    <div
                        class="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                    ></div>
                    <div
                        class="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-5/6"
                    ></div>
                    <div
                        class="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-4/6"
                    ></div>
                </div>

                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6"
                >
                    <div class="space-y-3 sm:space-y-4">
                        <div
                            class="h-5 sm:h-6 lg:h-7 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                        ></div>
                        <div
                            v-for="n in 4"
                            :key="n"
                            class="space-y-1 sm:space-y-2"
                        >
                            <div
                                class="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                            ></div>
                        </div>
                    </div>
                    <div class="space-y-3 sm:space-y-4">
                        <div
                            class="h-5 sm:h-6 lg:h-7 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                        ></div>
                        <div
                            v-for="n in 3"
                            :key="n"
                            class="space-y-1 sm:space-y-2"
                        >
                            <div
                                class="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                            ></div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-3 sm:gap-4">
                    <div
                        class="flex-1 h-10 sm:h-12 lg:h-14 bg-gray-300 dark:bg-gray-700 rounded-lg sm:rounded-xl animate-pulse"
                    ></div>
                    <div
                        class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gray-300 dark:bg-gray-700 rounded-lg sm:rounded-xl animate-pulse"
                    ></div>
                </div>
            </div>
        </div>

        <!-- Ошибка -->
        <div v-else-if="error || !product">
            <UAlert
                icon="i-heroicons-exclamation-triangle"
                color="red"
                title="Товар не найден"
                description="Запрошенный товар не существует или был удален"
                class="max-w-2xl mx-auto"
            />
        </div>

        <!-- Контент товара -->
        <div
            v-else
            class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12"
        >
            <!-- Галерея изображений -->
            <div class="lg:col-span-7 xl:col-span-7">
                <div class="flex gap-4 sm:gap-6">
                    <!-- Миниатюры -->
                    <div
                        class="hidden sm:flex flex-col space-y-3 w-24 flex-shrink-0"
                    >
                        <button
                            v-for="(img, index) in productImages"
                            :key="index"
                            @click="currentImageIndex = index"
                            :class="[
                                'border-3 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary object-cover bg-white p-1',
                                currentImageIndex === index
                                    ? 'border-primary shadow-lg scale-105'
                                    : 'border-gray-200 dark:border-gray-700 hover:shadow-md',
                            ]"
                        >
                            <NuxtImg
                                :src="img"
                                :alt="`${product.name} - изображение ${
                                    index + 1
                                }`"
                                class="w-full h-20 object-contain"
                                loading="lazy"
                            />
                        </button>
                    </div>

                    <!-- Основное изображение -->
                    <div class="flex-1">
                        <div
                            class="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-gray-200 p-4 sm:p-6 md:p-8"
                        >
                            <NuxtImg
                                :src="currentImage"
                                :alt="product.name"
                                class="h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>

                <!-- Миниатюры для мобильных (горизонтальный скролл) -->
                <div class="sm:hidden mt-4 overflow-x-auto pb-2">
                    <div class="flex space-x-3 min-w-min">
                        <button
                            v-for="(img, index) in productImages"
                            :key="index"
                            @click="currentImageIndex = index"
                            :class="[
                                'border-2 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary bg-white p-1 flex-shrink-0',
                                currentImageIndex === index
                                    ? 'border-primary shadow-md scale-105'
                                    : 'border-gray-200 dark:border-gray-700 hover:shadow-sm',
                            ]"
                            style="width: 80px; height: 80px"
                        >
                            <NuxtImg
                                :src="img"
                                :alt="`${product.name} - изображение ${
                                    index + 1
                                }`"
                                class="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Информация о товаре -->
            <div class="lg:col-span-5 xl:col-span-5">
                <div class="space-y-4 sm:space-y-6 lg:space-y-8">
                    <!-- Заголовок и цена -->
                    <div class="space-y-3 sm:space-y-4">
                        <h1
                            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight break-words"
                        >
                            {{ product.name }}
                        </h1>
                        <div
                            class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                        >
                            <p
                                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary"
                            >
                                {{ formatPrice(product.price) }}
                            </p>
                            <UBadge
                                v-if="product.in_stock !== false"
                                color="green"
                                variant="subtle"
                                class="text-xs sm:text-sm w-fit"
                            >
                                В наличии
                            </UBadge>
                            <UBadge
                                v-else
                                color="orange"
                                variant="subtle"
                                class="text-xs sm:text-sm w-fit"
                            >
                                Под заказ
                            </UBadge>
                        </div>
                    </div>

                    <!-- Описание -->
                    <div
                        class="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
                    >
                        <p
                            class="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed"
                        >
                            {{ product.description }}
                        </p>
                    </div>

                    <!-- Кнопки действий -->
                    <div class="space-y-3 sm:space-y-4">
                        <div
                            class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                        >
                            <!-- Кнопка добавления в корзину -->
                            <UButton
                                v-if="!isInCart(product.id)"
                                size="lg"
                                :size="{ sm: 'lg', md: 'xl' }"
                                color="primary"
                                class="flex-1 h-12 sm:h-14 text-base sm:text-lg font-semibold"
                                @click="handleAddToCart(product)"
                                :disabled="product.in_stock === false"
                            >
                                <UIcon
                                    name="i-heroicons-shopping-cart"
                                    class="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                                />
                                {{
                                    product.in_stock === false
                                        ? "Под заказ"
                                        : "В корзину"
                                }}
                            </UButton>

                            <!-- Управление количеством в корзине -->
                            <div
                                v-else
                                class="flex items-center justify-between sm:justify-start gap-2 sm:gap-4 flex-1"
                            >
                                <UButton
                                    :icon="
                                        currentQuantity === 1
                                            ? 'i-heroicons-trash'
                                            : 'i-heroicons-minus'
                                    "
                                    :color="
                                        currentQuantity === 1
                                            ? 'error'
                                            : 'primary'
                                    "
                                    variant="outline"
                                    size="lg"
                                    @click="decreaseQuantity(product)"
                                    :title="
                                        currentQuantity === 1
                                            ? 'Удалить из корзины'
                                            : 'Уменьшить количество'
                                    "
                                    class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center"
                                />

                                <div
                                    class="flex flex-col items-center mx-1 sm:mx-2"
                                >
                                    <span
                                        class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
                                    >
                                        {{ currentQuantity }} шт.
                                    </span>
                                    <span
                                        class="text-base sm:text-lg font-semibold text-primary"
                                    >
                                        {{
                                            formatPrice(
                                                currentQuantity * product.price
                                            )
                                        }}
                                    </span>
                                </div>

                                <UButton
                                    icon="i-heroicons-plus"
                                    color="primary"
                                    variant="outline"
                                    size="lg"
                                    @click="increaseQuantity(product)"
                                    title="Увеличить количество"
                                    class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center"
                                />
                            </div>

                            <UButton
                                :icon="
                                    isInFavorites(product.id)
                                        ? 'i-heroicons-heart-20-solid'
                                        : 'i-heroicons-heart'
                                "
                                :color="
                                    isInFavorites(product.id)
                                        ? 'error'
                                        : 'neutral'
                                "
                                variant="outline"
                                size="lg"
                                @click="toggleFavorite(product)"
                                class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center flex-shrink-0"
                                :title="
                                    isInFavorites(product.id)
                                        ? 'Удалить из избранного'
                                        : 'Добавить в избранное'
                                "
                            />
                        </div>

                        <!-- Кнопка перехода в корзину -->
                        <UButton
                            v-if="isInCart(product.id)"
                            color="primary"
                            variant="soft"
                            class="w-full h-10 sm:h-12 text-sm sm:text-lg font-semibold"
                            @click="navigateTo('/cart')"
                        >
                            <UIcon
                                name="i-heroicons-shopping-bag"
                                class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                            />
                            Перейти в корзину
                        </UButton>
                    </div>

                    <!-- Детали товара -->
                    <div class="grid grid-cols-1 gap-4 sm:gap-6">
                        <!-- Характеристики -->
                        <UCard
                            v-if="
                                product.specifications &&
                                Object.keys(product.specifications).length > 0
                            "
                            class="overflow-hidden"
                            :ui="{
                                body: { padding: 'p-0' },
                                header: {
                                    padding: 'px-4 sm:px-6 py-3 sm:py-4',
                                },
                                ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
                            }"
                        >
                            <template #header>
                                <div class="flex items-center gap-2 sm:gap-3">
                                    <UIcon
                                        name="i-heroicons-cog-6-tooth"
                                        class="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                                    />
                                    <h3
                                        class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
                                    >
                                        Характеристики
                                    </h3>
                                </div>
                            </template>

                            <div
                                class="divide-y divide-gray-100 dark:divide-gray-800 max-h-[300px] sm:max-h-none overflow-y-auto"
                            >
                                <div
                                    v-for="(
                                        value, key
                                    ) in product.specifications"
                                    :key="key"
                                    class="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <span
                                        class="font-medium text-gray-600 dark:text-gray-400 text-xs sm:text-sm uppercase tracking-wide mb-1 sm:mb-0"
                                    >
                                        {{ formatSpecKey(key) }}
                                    </span>
                                    <span
                                        class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base break-words text-right sm:text-right"
                                    >
                                        {{ value }}
                                    </span>
                                </div>
                            </div>
                        </UCard>

                        <!-- Комплектация -->
                        <UCard
                            v-if="
                                product.package_contents &&
                                product.package_contents.length
                            "
                            class="overflow-hidden"
                            :ui="{
                                body: { padding: 'p-0' },
                                header: {
                                    padding: 'px-4 sm:px-6 py-3 sm:py-4',
                                },
                                ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
                            }"
                        >
                            <template #header>
                                <div class="flex items-center gap-2 sm:gap-3">
                                    <UIcon
                                        name="i-heroicons-gift"
                                        class="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                                    />
                                    <h3
                                        class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
                                    >
                                        Комплектация
                                    </h3>
                                </div>
                            </template>

                            <ul
                                class="divide-y divide-gray-100 dark:divide-gray-800 max-h-[200px] sm:max-h-none overflow-y-auto"
                            >
                                <li
                                    v-for="(
                                        item, index
                                    ) in product.package_contents"
                                    :key="index"
                                    class="flex items-start px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <UIcon
                                        name="i-heroicons-check-circle"
                                        class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5"
                                    />
                                    <span
                                        class="text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words"
                                        >{{ item }}</span
                                    >
                                </li>
                            </ul>
                        </UCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const { $supabase } = useNuxtApp();
const productId = route.params.id;

const currentImageIndex = ref(0);

const {
    pending,
    data: product,
    error,
} = await useAsyncData(`product-${productId}`, async () => {
    const { data, error } = await $supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .eq("is_published", true)
        .single();

    if (error) {
        console.error("Ошибка загрузки товара:", error);
        throw createError({
            statusCode: 404,
            statusMessage: "Товар не найден",
        });
    }

    return data;
});

// Инициализируем корзину
const { addToCart, cart, updateQuantity, removeFromCart } = useCart();

// Добавляем функцию проверки наличия в корзине
const isInCart = (productId) => {
    return cart.value.some((item) => item.product.id === productId);
};

// Получаем текущее количество товара в корзине
const currentQuantity = computed(() => {
    if (!product.value) return 0;
    const cartItem = cart.value.find(
        (item) => item.product.id === product.value.id
    );
    return cartItem ? cartItem.quantity : 0;
});

const { isInFavorites, toggleFavorite, loadFavorites } = useFavorites();

onMounted(async () => {
    await loadFavorites();
});

const productImages = computed(() => {
    if (!product.value) return [];

    if (Array.isArray(product.value.images)) {
        return product.value.images;
    }

    if (typeof product.value.images === "string") {
        return [product.value.images];
    }

    return [];
});

const currentImage = computed(() => {
    return productImages.value[currentImageIndex.value] || "";
});

const formatSpecKey = (key) => {
    const words = key.replace(/([A-Z])/g, " $1").toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
};

const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

const handleAddToCart = (product) => {
    addToCart(product, 1);

    const toast = useToast();
    toast.add({
        title: "Товар добавлен в корзину",
        description: product.name,
        color: "primary",
        timeout: 3000,
    });
};

const increaseQuantity = (product) => {
    const newQuantity = currentQuantity.value + 1;
    updateQuantity(product.id, newQuantity);

    const toast = useToast();
    toast.add({
        title: "Количество обновлено",
        description: `${product.name}: ${newQuantity} шт.`,
        color: "primary",
        timeout: 2000,
    });
};

const decreaseQuantity = (product) => {
    if (currentQuantity.value === 1) {
        // Удаляем товар из корзины
        removeFromCart(product.id);

        const toast = useToast();
        toast.add({
            title: "Товар удален из корзины",
            description: product.name,
            color: "error",
            timeout: 3000,
        });
    } else {
        // Уменьшаем количество
        const newQuantity = currentQuantity.value - 1;
        updateQuantity(product.id, newQuantity);

        const toast = useToast();
        toast.add({
            title: "Количество обновлено",
            description: `${product.name}: ${newQuantity} шт.`,
            color: "primary",
            timeout: 2000,
        });
    }
};

const navigateTo = (path) => {
    useRouter().push(path);
};
</script>

<style scoped>
/* Скрыть скроллбар для миниатюр на мобильных */
.overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
    display: none;
}

/* Улучшение для тач-устройств */
@media (hover: none) and (pointer: coarse) {
    .hover\\:scale-105:hover {
        transform: none;
    }

    button {
        min-height: 44px;
    }
}

/* Адаптивные изображения */
img {
    max-width: 100%;
    height: auto;
}

/* Улучшение читаемости на маленьких экранах */
@media (max-width: 640px) {
    .break-words {
        word-break: break-word;
        overflow-wrap: break-word;
    }
}
</style>
