<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold flex items-center gap-2">
                    <UIcon
                        name="i-heroicons-heart"
                        class="w-5 h-5 text-red-500"
                    />
                    Избранные товары
                </h2>
                <UButton
                    @click="loadFavorites"
                    variant="outline"
                    size="sm"
                    :loading="loading"
                    icon="i-heroicons-arrow-path"
                >
                    Обновить
                </UButton>
            </div>
        </template>

        <div v-if="loading" class="flex justify-center py-8">
            <UButton loading>Загрузка избранного...</UButton>
        </div>

        <div v-else-if="favorites.length === 0" class="text-center py-8">
            <UIcon
                name="i-heroicons-heart"
                class="w-16 h-16 text-gray-300 mx-auto mb-4"
            />
            <h3 class="text-lg font-semibold text-gray-600 mb-2">
                В избранном пока пусто
            </h3>
            <p class="text-gray-500 mb-4">
                Добавляйте товары в избранное, чтобы не потерять
            </p>
            <UButton to="/products" icon="i-heroicons-shopping-cart" size="lg">
                Перейти к покупкам
            </UButton>
        </div>

        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            <UCard
                v-for="favorite in favorites"
                :key="favorite.id"
                class="card-hover relative"
            >
                <!-- Кнопка удаления из избранного -->
                <div class="absolute top-2 right-2 z-10">
                    <UButton
                        icon="i-heroicons-x-mark"
                        color="red"
                        variant="solid"
                        size="sm"
                        class="bg-white/90 backdrop-blur-sm hover:bg-white"
                        @click="removeFromFavorites(favorite.product_id)"
                    />
                </div>

                <div class="space-y-3">
                    <NuxtImg
                        v-if="favorite.products?.images?.[0]"
                        :src="favorite.products.images[0]"
                        :alt="favorite.products.name"
                        class="w-full h-40 object-cover rounded-md cursor-pointer"
                        @click="navigateTo(`/products/${favorite.products.id}`)"
                    />
                    <div
                        v-else
                        class="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
                        @click="
                            navigateTo(`/products/${favorite.products?.id}`)
                        "
                    >
                        <UIcon
                            name="i-heroicons-photo"
                            class="w-8 h-8 text-gray-400"
                        />
                    </div>

                    <h3
                        class="font-semibold cursor-pointer line-clamp-2"
                        @click="
                            navigateTo(`/products/${favorite.products?.id}`)
                        "
                    >
                        {{ favorite.products?.name || "Неизвестный товар" }}
                    </h3>

                    <p
                        class="text-xl font-bold text-primary"
                        v-if="favorite.products?.price"
                    >
                        {{ formatPrice(favorite.products.price) }}
                    </p>

                    <p class="text-gray-600 text-sm line-clamp-2">
                        {{
                            favorite.products?.description ||
                            "Описание отсутствует"
                        }}
                    </p>
                </div>

                <template #footer>
                    <div class="flex gap-2">
                        <UButton
                            icon="i-heroicons-shopping-cart"
                            color="primary"
                            class="flex-1"
                            @click="handleAddToCart(favorite.products)"
                            :disabled="!favorite.products"
                        >
                            В корзину
                        </UButton>
                    </div>
                </template>
            </UCard>
        </div>
    </UCard>
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
        color: "green",
        timeout: 3000,
    });
};

const formatPrice = (price) => {
    if (!price) return "0 ₽";
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

onMounted(() => {
    loadFavorites();
});
</script>

<style scoped>
.card-hover {
    transition: all 0.2s ease-in-out;
    transform: translateY(0);
}

.card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
