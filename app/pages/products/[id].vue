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
            <!-- Галерея изображений -->
            <div>
                <img
                    :src="product.images?.[0]"
                    :alt="product.name"
                    class="w-full h-96 object-cover rounded-lg mb-4"
                />
                <div
                    v-if="product.images && product.images.length > 1"
                    class="grid grid-cols-4 gap-2"
                >
                    <img
                        v-for="(img, index) in product.images.slice(1)"
                        :key="index"
                        :src="img"
                        :alt="`${product.name} - фото ${index + 2}`"
                        class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                        @click="currentImage = img"
                    />
                </div>
            </div>

            <!-- Информация о товаре -->
            <div class="space-y-6">
                <div>
                    <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
                    <p class="text-4xl font-bold text-primary mb-4">
                        {{ product.price }} ₽
                    </p>
                    <p class="text-gray-700">{{ product.description }}</p>
                </div>

                <!-- Характеристики -->
                <UCard v-if="product.specifications">
                    <template #header>
                        <h3 class="text-lg font-semibold">Характеристики</h3>
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
                            <span class="text-gray-900">{{ value }}</span>
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
                            v-for="(item, index) in product.package_contents"
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

                <!-- Кнопка добавления в корзину -->
                <UButton size="lg" class="w-full" @click="addToCart(product)">
                    <UIcon
                        name="i-heroicons-shopping-cart"
                        class="w-5 h-5 mr-2"
                    />
                    Добавить в корзину
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const { $supabase } = useNuxtApp();
const productId = route.params.id;

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

// Функция для форматирования ключей характеристик
const formatSpecKey = (key) => {
    const words = key.replace(/([A-Z])/g, " $1").toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
};

// Функция добавления в корзину (заглушка)
const addToCart = (product) => {
    // Здесь будет логика добавления в корзину
    console.log("Добавлен в корзину:", product);
    // Можно использовать useToast из Nuxt UI для уведомлений
};
</script>
