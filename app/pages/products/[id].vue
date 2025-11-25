<template>
    <div class="container mx-auto p-4">
        <UButton
            variant="ghost"
            icon="i-heroicons-arrow-left"
            @click="navigateTo('/products')"
            class="mb-4"
        >
            Назад к каталогу
        </UButton>

        <div v-if="pending" class="flex justify-center">
            <UButton loading>Загрузка товара...</UButton>
        </div>

        <div v-else-if="error || !product">
            <UAlert
                icon="i-heroicons-exclamation-triangle"
                color="red"
                title="Товар не найден"
                description="Запрошенный товар не существует или был удален"
            />
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Галерея изображений с вертикальным слайдером -->
            <div class="flex gap-4">
                <!-- Миниатюры (вертикальный список) -->
                <div class="flex flex-col space-y-2 w-20 flex-shrink-0">
                    <button
                        v-for="(img, index) in productImages"
                        :key="index"
                        @click="currentImageIndex = index"
                        :class="[
                            'border-2 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary object-cover',
                            currentImageIndex === index
                                ? 'border-primary scale-105'
                                : 'border-gray-200',
                        ]"
                    >
                        <NuxtImg
                            :src="img"
                            :alt="`${product.name} - изображение ${index + 1}`"
                            class="w-full h-16 object-contain"
                            loading="lazy"
                        />
                    </button>
                </div>

                <!-- Основное изображение -->
                <div class="flex-1">
                    <div
                        class="h-[510px] flex items-center justify-center rounded-lg overflow-hidden"
                    >
                        <NuxtImg
                            :src="currentImage"
                            :alt="product.name"
                            class="h-full max-w-full object-contain"
                            loading="eager"
                        />
                    </div>
                </div>
            </div>

            <!-- Информация о товаре -->
            <div class="space-y-6">
                <!-- Заголовок и кнопка избранного -->
                <div class="flex justify-between items-start gap-4">
                    <div class="flex-1">
                        <h1 class="text-3xl font-bold mb-2">
                            {{ product.name }}
                        </h1>
                        <p class="text-4xl font-bold text-primary mb-4">
                            {{ formatPrice(product.price) }}
                        </p>
                    </div>
                    <UButton
                        :icon="
                            isInFavorites(product.id)
                                ? 'i-heroicons-heart'
                                : 'i-heroicons-heart-outline'
                        "
                        :color="isInFavorites(product.id) ? 'red' : 'gray'"
                        :variant="
                            isInFavorites(product.id) ? 'solid' : 'outline'
                        "
                        @click="toggleFavorite(product)"
                        class="flex-shrink-0"
                        size="lg"
                    >
                        {{
                            isInFavorites(product.id)
                                ? "В избранном"
                                : "В избранное"
                        }}
                    </UButton>
                </div>

                <p class="text-gray-700">{{ product.description }}</p>

                <div class="flex gap-8">
                    <!-- Характеристики -->
                    <UCard v-if="product.specifications">
                        <template #header>
                            <h3 class="text-lg font-semibold">
                                Характеристики
                            </h3>
                        </template>

                        <div class="space-y-2">
                            <div
                                v-for="(value, key) in product.specifications"
                                :key="key"
                                class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                            >
                                <span class="font-medium text-gray-600"
                                    >{{ formatSpecKey(key) }}:</span
                                >
                                <span>{{ value }}</span>
                            </div>
                        </div>
                    </UCard>

                    <!-- Комплектация -->
                    <UCard
                        v-if="
                            product.package_contents &&
                            product.package_contents.length
                        "
                    >
                        <template #header>
                            <h3 class="text-lg font-semibold">Комплектация</h3>
                        </template>

                        <ul class="space-y-2">
                            <li
                                v-for="(
                                    item, index
                                ) in product.package_contents"
                                :key="index"
                                class="flex items-center"
                            >
                                <UIcon
                                    name="i-heroicons-check"
                                    class="w-5 h-5 text-green-500 mr-2"
                                />
                                {{ item }}
                            </li>
                        </ul>
                    </UCard>
                </div>

                <!-- Кнопки действий -->
                <div class="flex gap-3">
                    <UButton
                        size="lg"
                        class="flex-1"
                        @click="handleAddToCart(product)"
                    >
                        <UIcon
                            name="i-heroicons-shopping-cart"
                            class="w-5 h-5 mr-2"
                        />
                        Добавить в корзину
                    </UButton>

                    <UButton
                        :icon="
                            isInFavorites(product.id)
                                ? 'i-heroicons-heart'
                                : 'i-heroicons-heart-outline'
                        "
                        :color="isInFavorites(product.id) ? 'red' : 'gray'"
                        variant="outline"
                        size="lg"
                        @click="toggleFavorite(product)"
                    />
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

const { addToCart } = useCart();
const { isInFavorites, toggleFavorite, loadFavorites } = useFavorites();

onMounted(() => {
    loadFavorites();
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
        color: "green",
        timeout: 3000,
    });
};
</script>
