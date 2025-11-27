<template>
    <div class="space-y-6">
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
        >
            <div class="flex justify-between items-center mb-8">
                <div class="flex items-center gap-3">
                    <UIcon
                        name="i-heroicons-heart"
                        class="w-7 h-7 text-red-500"
                    />
                    <h2
                        class="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        Избранные товары
                    </h2>
                </div>
                <div class="flex items-center gap-3">
                    <UBadge color="red" variant="subtle" size="lg">
                        {{ favorites.length }} товаров
                    </UBadge>
                    <UButton
                        @click="loadFavorites"
                        variant="outline"
                        size="lg"
                        :loading="loading"
                        icon="i-heroicons-arrow-path"
                        class="transition-all duration-300"
                    >
                        Обновить
                    </UButton>
                </div>
            </div>

            <div v-if="loading" class="flex justify-center py-12">
                <UButton loading size="xl">Загрузка избранного...</UButton>
            </div>

            <div v-else-if="favorites.length === 0" class="text-center py-12">
                <div class="max-w-md mx-auto">
                    <div
                        class="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <UIcon
                            name="i-heroicons-heart"
                            class="w-16 h-16 text-red-400"
                        />
                    </div>
                    <h3
                        class="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                    >
                        В избранном пока пусто
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                        Добавляйте товары в избранное, чтобы не потерять
                    </p>
                    <UButton
                        to="/products"
                        icon="i-heroicons-shopping-cart"
                        size="xl"
                        color="primary"
                        class="transition-all duration-300"
                    >
                        Перейти к покупкам
                    </UButton>
                </div>
            </div>

            <div
                v-else
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                <div
                    v-for="favorite in favorites"
                    :key="favorite.id"
                    class="group bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-transparent hover:border-primary"
                >
                    <div class="flex flex-col h-full">
                        <!-- Изображение товара -->
                        <div class="relative mb-4">
                            <div
                                class="w-full min-h-[192px] rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-4 cursor-pointer"
                                @click="
                                    navigateToProduct(favorite.products?.id)
                                "
                            >
                                <NuxtImg
                                    v-if="favorite.products?.images?.[0]"
                                    :src="favorite.products.images[0]"
                                    :alt="favorite.products?.name || 'Товар'"
                                    class="max-w-full max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div
                                    v-else
                                    class="w-full h-40 flex items-center justify-center"
                                >
                                    <UIcon
                                        name="i-heroicons-photo"
                                        class="w-12 h-12 text-gray-400"
                                    />
                                </div>
                            </div>

                            <!-- Кнопка удаления из избранного -->
                            <UButton
                                icon="i-heroicons-heart-20-solid"
                                color="red"
                                variant="solid"
                                size="sm"
                                class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                                @click="
                                    removeFromFavorites(favorite.product_id)
                                "
                                :title="'Удалить из избранного'"
                            />
                        </div>

                        <!-- Информация о товаре -->
                        <div class="flex-1 flex flex-col">
                            <h3
                                class="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-200"
                                @click="
                                    navigateToProduct(favorite.products?.id)
                                "
                            >
                                {{
                                    favorite.products?.name ||
                                    "Неизвестный товар"
                                }}
                            </h3>

                            <p
                                v-if="favorite.products?.description"
                                class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1"
                            >
                                {{ favorite.products.description }}
                            </p>
                            <p
                                v-else
                                class="text-gray-400 dark:text-gray-500 text-sm mb-4 italic flex-1"
                            >
                                Описание отсутствует
                            </p>

                            <div class="mt-auto">
                                <p
                                    class="text-2xl font-bold text-primary mb-4"
                                    v-if="favorite.products?.price"
                                >
                                    {{ formatPrice(favorite.products.price) }}
                                </p>
                                <p
                                    v-else
                                    class="text-lg font-semibold text-gray-400 mb-4"
                                >
                                    Цена не указана
                                </p>

                                <div class="flex gap-2">
                                    <UButton
                                        block
                                        color="primary"
                                        @click="
                                            navigateToProduct(
                                                favorite.products?.id
                                            )
                                        "
                                        class="flex-1"
                                        :disabled="!favorite.products"
                                    >
                                        Подробнее
                                    </UButton>
                                    <UButton
                                        icon="i-heroicons-shopping-cart"
                                        color="emerald"
                                        @click="
                                            handleAddToCart(favorite.products)
                                        "
                                        :title="'Добавить в корзину'"
                                        :disabled="!favorite.products"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { favorites, loadFavorites, removeFromFavorites, loading } =
    useFavorites();
const { addToCart } = useCart();

const handleAddToCart = (product) => {
    if (!product) return;

    addToCart(product, 1);

    const toast = useToast();
    toast.add({
        title: "Товар добавлен в корзину",
        description: product.name,
        color: "primary",
        timeout: 3000,
    });
};

const formatPrice = (price) => {
    if (!price) return "0 ₽";
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

const navigateToProduct = (productId) => {
    if (!productId) return;
    navigateTo(`/products/${productId}`);
};

onMounted(() => {
    loadFavorites();
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
