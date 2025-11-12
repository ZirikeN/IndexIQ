<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>

        <div class="grid grid-cols-4 gap-6">
            <UCard
                v-for="product in products"
                :key="product.id"
                class="card-hover"
            >
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
                            icon="i-heroicons-heart"
                            color="neutral"
                            class="flex-1 cursor-pointer"
                            variant="outline"
                        >
                            В избранное
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

const { data: products, error } = await useAsyncData("products", async () => {
    try {
        console.log("Запрос к Supabase...");

        const { data, error } = await $supabase
            .from("products")
            .select("*")
            .eq("is_published", true);

        if (error) {
            console.error("Supabase Error:", error);
            throw error;
        }

        console.log("Получены данные:", data);
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
        color: "green",
        timeout: 3000,
    });
};

// Добавьте это для отладки
if (error.value) {
    console.error("Ошибка useAsyncData:", error.value);
}

console.log("Products:", products.value);
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
