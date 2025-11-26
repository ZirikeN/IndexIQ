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

        <div v-else class="grid grid-cols-4 gap-6">
            <UCard
                v-for="product in products"
                :key="product.id"
                class="card-hover relative p-0"
                :ui="{
                    footer: 'p-0 pb-4',
                }"
            >
                <div>
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
                    <p>{{ product.description }}</p>
                </div>

                <template #footer>
                    <div class="flex gap-2">
                        <UButton
                            :icon="
                                isInFavorites(product.id)
                                    ? 'i-heroicons-heart-20-solid'
                                    : 'i-heroicons-heart'
                            "
                            :color="
                                isInFavorites(product.id) ? 'error' : 'neutral'
                            "
                            class="flex-1 cursor-pointer"
                            variant="outline"
                            :loading="favoriteActionLoading === product.id"
                            @click="handleToggleFavorite(product)"
                        >
                            {{
                                isInFavorites(product.id)
                                    ? "В избранном"
                                    : "В избранное"
                            }}
                        </UButton>

                        <UButton
                            v-if="!isInCart(product.id)"
                            icon="i-heroicons-shopping-cart"
                            color="primary"
                            class="flex-1 cursor-pointer text-white"
                            @click="handleAddToCart(product)"
                        >
                            В корзину
                        </UButton>

                        <UButton
                            v-else
                            icon="i-heroicons-shopping-bag"
                            color="primary"
                            class="flex-1 cursor-pointer"
                            @click="navigateTo('/cart')"
                        >
                            В корзине
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
