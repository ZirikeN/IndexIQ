<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>

        <div v-if="pending" class="flex justify-center">
            <UButton loading>Загрузка...</UButton>
        </div>

        <div v-else-if="error" class="text-red-500 text-center">
            <UIcon
                name="i-heroicons-exclamation-triangle"
                class="w-8 h-8 mx-auto mb-2"
            />
            <p>Ошибка загрузки: {{ error.message }}</p>
            <UButton
                color="red"
                variant="outline"
                @click="refresh"
                class="mt-4"
            >
                Попробовать снова
            </UButton>
        </div>

        <div
            v-else-if="!products || products.length === 0"
            class="text-center py-8"
        >
            <UIcon
                name="i-heroicons-inbox"
                class="w-16 h-16 text-gray-400 mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Товаров пока нет</h3>
            <p class="text-gray-600 mb-4">Но скоро появятся!</p>
        </div>

        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <UCard
                v-for="product in products"
                :key="product.id"
                class="hover:shadow-lg transition-shadow duration-300"
            >
                <template #header>
                    <h2 class="text-lg font-semibold line-clamp-2">
                        {{ product.name }}
                    </h2>
                </template>

                <div class="space-y-3">
                    <img
                        v-if="product.images && product.images[0]"
                        :src="product.images[0]"
                        :alt="product.name"
                        class="w-full h-48 object-cover rounded-md"
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

                    <p class="text-2xl font-bold text-primary">
                        {{ product.price }} ₽
                    </p>
                    <p class="text-gray-600 text-sm line-clamp-3">
                        {{ product.description }}
                    </p>
                </div>

                <template #footer>
                    <UButton
                        block
                        @click="navigateTo(`/products/${product.id}`)"
                    >
                        Подробнее
                    </UButton>
                </template>
            </UCard>
        </div>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();
const debugInfo = ref(null);

const {
    pending,
    data: products,
    error,
    refresh,
} = await useAsyncData("products", async () => {
    try {
        console.log("🔄 Начинаем загрузку товаров...");

        // Проверяем подключение к Supabase
        const { data: session, error: sessionError } =
            await $supabase.auth.getSession();
        if (sessionError) {
            console.error("❌ Ошибка сессии:", sessionError);
        } else {
            console.log("✅ Сессия:", session.session ? "есть" : "нет");
        }

        // Делаем запрос к товарам
        const { data, error, count, status, statusText } = await $supabase
            .from("products")
            .select("*", { count: "exact" })
            .eq("is_published", true)
            .order("created_at", { ascending: false });

        console.log("📦 Результат запроса:");
        console.log("- Данные:", data);
        console.log("- Ошибка:", error);
        console.log("- Количество:", count);
        console.log("- Статус:", status);
        console.log("- Текст статуса:", statusText);

        // Сохраняем отладочную информацию
        debugInfo.value = {
            dataLength: data?.length || 0,
            error: error,
            count: count,
            status: status,
            statusText: statusText,
            timestamp: new Date().toISOString(),
        };

        if (error) {
            console.error("❌ Ошибка Supabase:", error);
            throw createError({
                statusCode: 500,
                statusMessage: `Ошибка базы данных: ${error.message}`,
            });
        }

        console.log(`✅ Успешно загружено ${data?.length || 0} товаров`);
        return data;
    } catch (err) {
        console.error("💥 Критическая ошибка:", err);
        throw err;
    }
});

// Логируем итоговые состояния
watchEffect(() => {
    console.log("📊 Состояние загрузки:");
    console.log("- pending:", pending.value);
    console.log("- error:", error.value);
    console.log("- products:", products.value);
});
</script>
