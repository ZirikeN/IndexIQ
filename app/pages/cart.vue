<template>
    <div class="container mx-auto p-4">
        <UPageHeader
            title="Корзина"
            description="Товары, которые вы добавили в корзину"
            class="mb-8"
        />

        <div v-if="cart.length === 0" class="text-center py-12">
            <UIcon
                name="i-heroicons-shopping-cart"
                class="w-24 h-24 text-gray-300 mx-auto mb-4"
            />
            <h2 class="text-2xl font-bold text-gray-600 mb-2">Корзина пуста</h2>
            <p class="text-gray-500 mb-6">
                Добавьте товары из каталога, чтобы сделать заказ
            </p>
            <UButton to="/products" icon="i-heroicons-arrow-left" size="lg">
                Вернуться к покупкам
            </UButton>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Список товаров -->
            <div class="lg:col-span-2 space-y-4">
                <UCard
                    v-for="cartItem in cart"
                    :key="cartItem.product.id"
                    class="cart-item"
                >
                    <div class="flex gap-4">
                        <!-- Изображение товара -->
                        <div class="flex-shrink-0">
                            <NuxtImg
                                v-if="
                                    cartItem.product.images &&
                                    cartItem.product.images[0]
                                "
                                :src="cartItem.product.images[0]"
                                :alt="cartItem.product.name"
                                class="w-20 h-20 object-cover rounded-lg"
                            />
                            <div
                                v-else
                                class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center"
                            >
                                <UIcon
                                    name="i-heroicons-photo"
                                    class="w-8 h-8 text-gray-400"
                                />
                            </div>
                        </div>

                        <!-- Информация о товаре -->
                        <div class="flex-1 min-w-0">
                            <h3 class="font-semibold text-lg truncate">
                                {{ cartItem.product.name }}
                            </h3>
                            <p class="text-primary font-bold text-xl">
                                {{ formatPrice(cartItem.product.price) }}
                            </p>
                            <p
                                v-if="cartItem.product.description"
                                class="text-gray-600 text-sm truncate"
                            >
                                {{ cartItem.product.description }}
                            </p>
                        </div>

                        <!-- Управление количеством и удаление -->
                        <div class="flex flex-col items-end gap-2">
                            <UButton
                                icon="i-heroicons-trash"
                                color="error"
                                variant="ghost"
                                size="sm"
                                @click="removeFromCart(cartItem.product.id)"
                            />

                            <div class="flex items-center gap-2">
                                <UButton
                                    icon="i-heroicons-minus"
                                    size="xs"
                                    :disabled="cartItem.quantity <= 1"
                                    @click="
                                        updateQuantity(
                                            cartItem.product.id,
                                            cartItem.quantity - 1
                                        )
                                    "
                                />

                                <span class="w-8 text-center font-medium">
                                    {{ cartItem.quantity }}
                                </span>

                                <UButton
                                    icon="i-heroicons-plus"
                                    size="xs"
                                    @click="
                                        updateQuantity(
                                            cartItem.product.id,
                                            cartItem.quantity + 1
                                        )
                                    "
                                />
                            </div>

                            <p class="font-bold text-lg">
                                {{
                                    formatPrice(
                                        cartItem.product.price *
                                            cartItem.quantity
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- Итоги и оформление -->
            <div class="space-y-6">
                <UCard>
                    <template #header>
                        <h3 class="text-lg font-semibold">Итоги заказа</h3>
                    </template>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span>Товары ({{ totalItems }})</span>
                            <span>{{ formatPrice(totalPrice) }}</span>
                        </div>

                        <div class="flex justify-between">
                            <span>Доставка</span>
                            <span class="text-green-600">Бесплатно</span>
                        </div>

                        <UDivider />

                        <div class="flex justify-between text-xl font-bold">
                            <span>Итого</span>
                            <span>{{ formatPrice(totalPrice) }}</span>
                        </div>
                    </div>

                    <template #footer>
                        <UButton
                            block
                            size="lg"
                            @click="navigateTo('/checkout')"
                            :disabled="cart.length === 0"
                        >
                            Оформить заказ
                        </UButton>
                    </template>
                </UCard>

                <UButton
                    block
                    variant="outline"
                    color="neutral"
                    @click="clearCart"
                >
                    Очистить корзину
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const {
    cart,
    totalPrice,
    totalItems,
    removeFromCart,
    updateQuantity,
    clearCart,
} = useCart();

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};
</script>

<style scoped>
.cart-item {
    transition: all 0.2s ease-in-out;
}

.cart-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
