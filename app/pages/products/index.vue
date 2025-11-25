<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>

        <div class="grid grid-cols-4 gap-6">
            <UCard
                v-for="product in products"
                :key="product.id"
                class="card-hover relative"
            >
                <!-- Кнопка избранного в углу карточки -->
                <div class="absolute top-3 right-3 z-10">
                    <UButton
                        :icon="
                            isInFavorites(product.id)
                                ? 'i-heroicons-heart'
                                : 'i-heroicons-heart-outline'
                        "
                        :color="isInFavorites(product.id) ? 'red' : 'gray'"
                        variant="solid"
                        size="sm"
                        class="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
                        @click="toggleFavorite(product)"
                    />
                </div>

                <div class="space-y-3">
                    <NuxtImg
                        v-if="product.images"
                        :src="product.images[0]"
                        :alt="product.name"
                        class="w-full object-cover rounded-md cursor-pointer"
                        loading="lazy"
                        @click="navigateTo(`/products/${product.id}`)"
                    />
                    <div
                        v-else
                        class="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center"
                    >
                        <UIcon
                            name="i-heroicons-photo"
                            class="w-12 h-12 text-gray-400"
                        />
                    </div>

                    <p
                        class="text-2xl font-medium text-primary cursor-pointer"
                        @click="navigateTo(`/products/${product.id}`)"
                    >
                        {{ product.price }} ₽
                    </p>
                    <h3
                        class="cursor-pointer"
                        @click="navigateTo(`/products/${product.id}`)"
                    >
                        {{ product.name }}
                    </h3>
                    <p class="text-gray-600">{{ product.description }}</p>
                </div>

                <template #footer>
                    <div class="flex gap-2">
                        <UButton
                            :icon="
                                isInFavorites(product.id)
                                    ? 'i-heroicons-heart'
                                    : 'i-heroicons-heart-outline'
                            "
                            :color="
                                isInFavorites(product.id) ? 'red' : 'neutral'
                            "
                            class="flex-1 cursor-pointer"
                            variant="outline"
                            @click="toggleFavorite(product)"
                        >
                            {{
                                isInFavorites(product.id)
                                    ? "В избранном"
                                    : "В избранное"
                            }}
                        </UButton>

                        <UButton
                            icon="i-heroicons-shopping-cart"
                            color="primary"
                            class="flex-1 cursor-pointer"
                            @click="handleAddToCart(product)"
                        >
                            В корзину
                        </UButton>
                    </div>
                </template>
            </UCard>
        </div>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();

// Инициализируем корзину
const { addToCart } = useCart();

// Инициализируем избранное
const { favorites, isInFavorites, toggleFavorite, loadFavorites } =
    useFavorites();

// Загружаем избранное при монтировании
onMounted(() => {
    loadFavorites();
});

const { data: products, error } = await useAsyncData("products", async () => {
    try {
        const { data, error } = await $supabase
            .from("products")
            .select("*")
            .eq("is_published", true);

        if (error) {
            console.error("Supabase Error:", error);
            throw error;
        }

        return data;
    } catch (err) {
        console.error("Ошибка в useAsyncData:", err);
        return [];
    }
});

// Функция добавления в корзину для каталога
const handleAddToCart = (product) => {
    addToCart(product, 1);

    // Показываем уведомление
    const toast = useToast();
    toast.add({
        title: "Товар добавлен в корзину",
        description: product.name,
        color: "primary",
        timeout: 3000,
    });
};
</script>

<style scoped>
.card-hover {
    transition: all 0.2s ease-in-out;
    transform: translateY(0);
}

.card-hover img {
    transition: all 0.2s ease-in-out;
}

.card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 5px var(--color-primary);
}

.card-hover:hover img {
    transform: scale(1.05);
}
</style>
