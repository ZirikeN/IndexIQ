<template>
    <div class="container mx-auto p-4 max-w-7xl">
        <UButton
            variant="ghost"
            icon="i-heroicons-arrow-left"
            @click="navigateTo('/products')"
            class="mb-6"
        >
            Назад к каталогу
        </UButton>

        <!-- Прелоадер для страницы товара -->
        <div v-if="pending" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Прелоадер для изображений -->
            <div class="flex gap-6">
                <div class="flex flex-col space-y-3 w-24 flex-shrink-0">
                    <div
                        v-for="n in 4"
                        :key="n"
                        class="w-full h-20 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                    ></div>
                </div>
                <div class="flex-1">
                    <div
                        class="h-[600px] bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse"
                    ></div>
                </div>
            </div>

            <!-- Прелоадер для информации -->
            <div class="space-y-8">
                <div class="space-y-4">
                    <div
                        class="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                    ></div>
                    <div
                        class="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                    ></div>
                </div>

                <div class="space-y-3">
                    <div
                        class="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                    ></div>
                    <div
                        class="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-5/6"
                    ></div>
                    <div
                        class="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-4/6"
                    ></div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div
                            class="h-7 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                        ></div>
                        <div v-for="n in 4" :key="n" class="space-y-2">
                            <div
                                class="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                            ></div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div
                            class="h-7 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                        ></div>
                        <div v-for="n in 3" :key="n" class="space-y-2">
                            <div
                                class="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                            ></div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div
                        class="flex-1 h-14 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                    ></div>
                    <div
                        class="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                    ></div>
                </div>
            </div>
        </div>

        <div v-else-if="error || !product">
            <UAlert
                icon="i-heroicons-exclamation-triangle"
                color="red"
                title="Товар не найден"
                description="Запрошенный товар не существует или был удален"
                class="max-w-2xl mx-auto"
            />
        </div>

        <div v-else class="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <!-- Галерея изображений -->
            <div class="xl:col-span-7">
                <div class="flex gap-6">
                    <!-- Миниатюры -->
                    <div class="flex flex-col space-y-3 w-24 flex-shrink-0">
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
                            class="h-[600px] flex items-center justify-center rounded-2xl overflow-hidden bg-white border border-gray-200 p-8"
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
            </div>

            <!-- Информация о товаре -->
            <div class="xl:col-span-5">
                <div class="space-y-8">
                    <!-- Заголовок и цена -->
                    <div class="space-y-4">
                        <h1
                            class="text-4xl font-bold text-gray-900 dark:text-white leading-tight"
                        >
                            {{ product.name }}
                        </h1>
                        <div class="flex items-center gap-4">
                            <p class="text-5xl font-bold text-primary">
                                {{ formatPrice(product.price) }}
                            </p>
                            <UBadge
                                v-if="product.in_stock !== false"
                                color="green"
                                variant="subtle"
                                class="text-sm"
                            >
                                В наличии
                            </UBadge>
                            <UBadge
                                v-else
                                color="orange"
                                variant="subtle"
                                class="text-sm"
                            >
                                Под заказ
                            </UBadge>
                        </div>
                    </div>

                    <!-- Описание -->
                    <div class="prose prose-lg max-w-none">
                        <p
                            class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
                        >
                            {{ product.description }}
                        </p>
                    </div>

                    <!-- Кнопки действий -->
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <!-- Кнопка добавления в корзину -->
                            <UButton
                                v-if="!isInCart(product.id)"
                                size="xl"
                                color="primary"
                                class="flex-1 h-14 text-lg font-semibold"
                                @click="handleAddToCart(product)"
                                :disabled="product.in_stock === false"
                            >
                                <UIcon
                                    name="i-heroicons-shopping-cart"
                                    class="w-6 h-6 mr-3"
                                />
                                {{
                                    product.in_stock === false
                                        ? "Товар под заказ"
                                        : "Добавить в корзину"
                                }}
                            </UButton>

                            <!-- Управление количеством в корзине -->
                            <div v-else class="flex items-center gap-4 flex-1">
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
                                    size="xl"
                                    @click="decreaseQuantity(product)"
                                    :title="
                                        currentQuantity === 1
                                            ? 'Удалить из корзины'
                                            : 'Уменьшить количество'
                                    "
                                    class="w-14 h-14 flex items-center justify-center"
                                />

                                <div class="flex flex-col items-center mx-2">
                                    <span
                                        class="text-2xl font-bold text-gray-900 dark:text-white"
                                    >
                                        {{ currentQuantity }} шт.
                                    </span>
                                    <span
                                        class="text-lg font-semibold text-primary"
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
                                    size="xl"
                                    @click="increaseQuantity(product)"
                                    title="Увеличить количество"
                                    class="w-14 h-14 flex items-center justify-center"
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
                                size="xl"
                                @click="toggleFavorite(product)"
                                class="w-14 h-14 flex items-center justify-center"
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
                            class="w-full h-12 text-lg font-semibold"
                            @click="navigateTo('/cart')"
                        >
                            <UIcon
                                name="i-heroicons-shopping-bag"
                                class="w-5 h-5 mr-2"
                            />
                            Перейти в корзину
                        </UButton>
                    </div>

                    <!-- Детали товара -->
                    <div class="grid grid-cols-1 gap-6">
                        <!-- Характеристики -->
                        <UCard
                            v-if="
                                product.specifications &&
                                Object.keys(product.specifications).length > 0
                            "
                            class="overflow-hidden"
                            :ui="{
                                body: { padding: 'p-0' },
                                header: { padding: 'px-6 py-4' },
                                ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
                            }"
                        >
                            <template #header>
                                <div class="flex items-center gap-3">
                                    <UIcon
                                        name="i-heroicons-cog-6-tooth"
                                        class="w-6 h-6 text-primary"
                                    />
                                    <h3
                                        class="text-xl font-semibold text-gray-900 dark:text-white"
                                    >
                                        Характеристики
                                    </h3>
                                </div>
                            </template>

                            <div
                                class="divide-y divide-gray-100 dark:divide-gray-800"
                            >
                                <div
                                    v-for="(
                                        value, key
                                    ) in product.specifications"
                                    :key="key"
                                    class="flex justify-between items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <span
                                        class="font-medium text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide"
                                    >
                                        {{ formatSpecKey(key) }}
                                    </span>
                                    <span
                                        class="font-semibold text-gray-900 dark:text-white text-right max-w-xs"
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
                                header: { padding: 'px-6 py-4' },
                                ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
                            }"
                        >
                            <template #header>
                                <div class="flex items-center gap-3">
                                    <UIcon
                                        name="i-heroicons-gift"
                                        class="w-6 h-6 text-primary"
                                    />
                                    <h3
                                        class="text-xl font-semibold text-gray-900 dark:text-white"
                                    >
                                        Комплектация
                                    </h3>
                                </div>
                            </template>

                            <ul
                                class="divide-y divide-gray-100 dark:divide-gray-800"
                            >
                                <li
                                    v-for="(
                                        item, index
                                    ) in product.package_contents"
                                    :key="index"
                                    class="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <UIcon
                                        name="i-heroicons-check-circle"
                                        class="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        class="text-gray-700 dark:text-gray-300"
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
</script>
