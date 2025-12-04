<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>

        <!-- Прелоадер только для первоначальной загрузки -->
        <div v-if="initialLoading" class="grid grid-cols-4 gap-6">
            <UCard v-for="n in 8" :key="n" class="animate-pulse">
                <div>
                    <div class="w-full h-48 bg-gray-300 rounded-md"></div>
                    <div class="h-6 bg-gray-300 rounded mt-2"></div>
                    <div class="h-4 bg-gray-300 rounded mt-1"></div>
                    <div class="h-4 bg-gray-300 rounded w-3/4 mt-1"></div>
                </div>
                <template #footer>
                    <div class="flex gap-2">
                        <div class="flex-1 h-10 bg-gray-300 rounded"></div>
                        <div class="flex-1 h-10 bg-gray-300 rounded"></div>
                    </div>
                </template>
            </UCard>
        </div>

        <div v-else class="products-grid">
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                :is-in-favorites="isInFavorites(product.id)"
                :is-in-cart="isInCart(product.id)"
                :loading="favoriteActionLoading === product.id"
                @toggle-favorite="handleToggleFavorite"
                @add-to-cart="handleAddToCart"
            />
        </div>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();

// Инициализируем корзину
const { addToCart, cart, isInCart } = useCart();

// Инициализируем избранное
const { favorites, isInFavorites, toggleFavorite, loadFavorites } =
    useFavorites();

// Состояния загрузки
const initialLoading = ref(true);
const favoriteActionLoading = ref(null);

// Загружаем данные
onMounted(async () => {
    try {
        await loadFavorites();
    } catch (error) {
        console.error("Ошибка загрузки избранного:", error);
    } finally {
        initialLoading.value = false;
    }
});

const {
    data: products,
    pending,
    error,
} = await useAsyncData("products", async () => {
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

// Обработчик добавления/удаления из избранного БЕЗ уведомлений
const handleToggleFavorite = async (product) => {
    // Устанавливаем loading только для конкретного товара
    favoriteActionLoading.value = product.id;

    try {
        // Просто вызываем toggleFavorite без дополнительных уведомлений
        await toggleFavorite(product);
        // Уведомление уже показывается внутри toggleFavorite
    } catch (error) {
        console.error("Ошибка при работе с избранным:", error);
    } finally {
        // Сбрасываем loading
        favoriteActionLoading.value = null;
    }
};

// Функция добавления в корзину для каталога
const handleAddToCart = (product) => {
    addToCart(product, 1);

    // Показываем уведомление
    const toast = useToast();
    toast.add({
        title: "Товар добавлен в корзину",
        description: product.name,
        color: "primary",
        timeout: 2000,
    });
};
</script>

<style scoped>
.container {
    margin: 0 auto;
    padding: 1rem;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

@media (max-width: 768px) {
    .products-grid {
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .products-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
    }
}
</style>
