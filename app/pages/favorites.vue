<template>
    <div class="container mx-auto p-6">
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-bold flex items-center gap-3">
                            <UIcon name="i-heroicons-heart" class="w-8 h-8 text-red-500" />
                            Избранное
                        </h1>
                        <p class="text-gray-600 mt-1">
                            Товары, которые вам понравились
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                        <UBadge v-if="favorites.length > 0" color="blue" variant="subtle" size="lg">
                            {{ favorites.length }} товаров
                        </UBadge>
                        <UButton
                            to="/products"
                            icon="i-heroicons-arrow-left"
                            variant="outline"
                        >
                            К покупкам
                        </UButton>
                    </div>
                </div>
            </template>

            <div v-if="loading" class="flex justify-center py-12">
                <div class="text-center">
                    <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
                    <p class="text-gray-600">Загрузка избранного...</p>
                </div>
            </div>

            <div v-else-if="favorites.length === 0" class="text-center py-16">
                <div class="max-w-md mx-auto">
                    <UIcon
                        name="i-heroicons-heart"
                        class="w-24 h-24 text-gray-300 mx-auto mb-6"
                    />
                    <h2 class="text-2xl font-bold text-gray-600 mb-3">
                        В избранном пока пусто
                    </h2>
                    <p class="text-gray-500 mb-8 text-lg">
                        Добавляйте товары в избранное, чтобы не потерять их
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <UButton
                            to="/products"
                            icon="i-heroicons-shopping-cart"
                            size="lg"
                            color="primary"
                        >
                            Перейти к покупкам
                        </UButton>
                        <UButton
                            to="/account"
                            variant="outline"
                            size="lg"
                        >
                            В личный кабинет
                        </UButton>
                    </div>
                </div>
            </div>

            <div v-else>
                <!-- Статистика -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                    <div class="flex flex-wrap gap-6">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <UIcon name="i-heroicons-heart" class="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Всего товаров</p>
                                <p class="text-2xl font-bold text-gray-900">{{ favorites.length }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <UIcon name="i-heroicons-currency-ruble" class="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Общая стоимость</p>
                                <p class="text-2xl font-bold text-gray-900">{{ formatPrice(totalPrice) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Сетка товаров -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <UCard
                        v-for="favorite in favorites"
                        :key="favorite.id"
                        class="hover:shadow-lg transition-all duration-300 relative group"
                    >
                        <!-- Кнопка удаления -->
                        <div class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <UButton
                                icon="i-heroicons-x-mark"
                                color="red"
                                variant="solid"
                                size="sm"
                                class="bg-white shadow-lg hover:bg-red-50"
                                @click="removeFromFavorites(favorite.product_id)"
                            />
                        </div>

                        <div class="space-y-4">
                            <!-- Изображение -->
                            <div 
                                class="relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                                @click="navigateTo(`/products/${favorite.products.id}`)"
                            >
                                <NuxtImg
                                    v-if="favorite.products?.images?.[0]"
                                    :src="favorite.products.images[0]"
                                    :alt="favorite.products.name"
                                    class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div
                                    v-else
                                    class="w-full h-48 flex items-center justify-center"
                                >
                                    <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
                                </div>
                            </div>

                            <!-- Информация о товаре -->
                            <div class="space-y-3">
                                <h3
                                    class="font-semibold text-lg cursor-pointer line-clamp-2 hover:text-primary transition-colors"
                                    @click="navigateTo(`/products/${favorite.products.id}`)"
                                >
                                    {{ favorite.products.name }}
                                </h3>

                                <p class="text-2xl font-bold text-primary">
                                    {{ formatPrice(favorite.products.price) }}
                                </p>

                                <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                    {{ favorite.products.description || 'Описание отсутствует' }}
                                </p>
                            </div>

                            <!-- Кнопки действий -->
                            <div class="flex gap-2 pt-2">
                                <UButton
                                    icon="i-heroicons-shopping-cart"
                                    color="primary"
                                    class="flex-1"
                                    @click="handleAddToCart(favorite.products)"
                                    :disabled="!favorite.products"
                                >
                                    В корзину
                                </UButton>
                                <UButton
                                    icon="i-heroicons-eye"
                                    variant="outline"
                                    @click="navigateTo(`/products/${favorite.products.id}`)"
                                />
                            </div>
                        </div>
                    </UCard>
                </div>

                <!-- Пустое состояние при фильтрации -->
                <div v-if="favorites.length === 0" class="text-center py-12">
                    <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 class="text-lg font-semibold text-gray-600 mb-2">Товары не найдены</h3>
                    <p class="text-gray-500">Попробуйте изменить параметры поиска</p>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup>
const { 
    favorites, 
    loadFavorites, 
    removeFromFavorites,
    loading 
} = useFavorites();

const { addToCart } = useCart();

// Общая стоимость избранного
const totalPrice = computed(() => {
    return favorites.value.reduce((total, favorite) => {
        return total + (favorite.products?.price || 0);
    }, 0);
});

const handleAddToCart = (product) => {
    if (!product) return;
    
    addToCart(product, 1);
    
    const toast = useToast();
    toast.add({
        title: "Товар добавлен в корзину",
        description: product.name,
        color: "green",
        timeout: 3000,
    });
};

const formatPrice = (price) => {
    if (!price) return '0 ₽';
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

// Загружаем избранное при монтировании
onMounted(() => {
    loadFavorites();
});

// Обновляем заголовок страницы
useSeoMeta({
    title: 'Избранное - Мои товары',
    description: 'Просмотрите товары, добавленные в избранное'
});
</script>