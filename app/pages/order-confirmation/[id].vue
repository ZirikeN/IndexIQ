<template>
    <div class="container mx-auto p-4">
        <div class="max-w-2xl mx-auto text-center">
            <UIcon
                name="i-heroicons-check-circle"
                class="w-24 h-24 text-green-500 mx-auto mb-6"
            />

            <h1 class="text-3xl font-bold mb-4">Заказ успешно оформлен!</h1>
            <p class="text-xl text-gray-600 mb-2">
                Номер вашего заказа: <strong>#{{ order?.id }}</strong>
            </p>
            <p class="text-gray-500 mb-8">
                Мы свяжемся с вами в ближайшее время для подтверждения заказа
            </p>

            <div class="space-y-4">
                <UButton to="/products" size="lg" class="mr-4">
                    Продолжить покупки
                </UButton>
                <UButton variant="outline" to="/" size="lg">
                    На главную
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const orderId = route.params.id;

// Здесь можно загрузить информацию о заказе из Supabase если нужно
const order = ref({
    id: orderId,
});
</script>
