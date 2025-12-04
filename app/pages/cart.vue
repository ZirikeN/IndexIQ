<template>
    <div class="container mx-auto p-4 max-w-8xl">
        <!-- Заголовок -->
        <div class="mb-8 text-center">
            <h1
                class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
            >
                Корзина
            </h1>
            <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Товары, которые вы добавили в корзину
            </p>
        </div>

        <!-- Пустая корзина -->
        <div v-if="cart.length === 0" class="text-center py-12 sm:py-16">
            <div class="max-w-md mx-auto px-4 sm:px-0">
                <div
                    class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                >
                    <UIcon
                        name="i-heroicons-shopping-cart"
                        class="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600 dark:text-emerald-400"
                    />
                </div>
                <h2
                    class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3"
                >
                    Корзина пуста
                </h2>
                <p
                    class="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg"
                >
                    Добавьте товары из каталога, чтобы сделать заказ
                </p>
                <UButton
                    to="/products"
                    icon="i-heroicons-arrow-left"
                    size="xl"
                    color="primary"
                    class="transition-all duration-300 w-full sm:w-auto"
                >
                    <span class="hidden sm:inline">Вернуться к покупкам</span>
                    <span class="sm:hidden">Вернуться</span>
                </UButton>
            </div>
        </div>

        <!-- Корзина с товарами -->
        <div v-else class="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
            <!-- Список товаров -->
            <div class="xl:col-span-3 space-y-4 sm:space-y-6">
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
                >
                    <h2
                        class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
                    >
                        Товары в корзине ({{ totalItems }})
                    </h2>

                    <div class="space-y-3 sm:space-y-4">
                        <div
                            v-for="cartItem in cart"
                            :key="cartItem.product.id"
                            class="group bg-gray-50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                        >
                            <div
                                class="flex flex-col sm:flex-row sm:gap-4 items-start"
                            >
                                <!-- Изображение товара и базовая информация -->
                                <div
                                    class="flex gap-3 w-full sm:w-auto mb-3 sm:mb-0"
                                >
                                    <!-- Изображение товара -->
                                    <div class="flex-shrink-0 relative">
                                        <div
                                            class="w-20 h-20 sm:w-28 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1 sm:p-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary"
                                            @click="
                                                navigateToProduct(
                                                    cartItem.product.id
                                                )
                                            "
                                        >
                                            <NuxtImg
                                                v-if="
                                                    cartItem.product.images &&
                                                    cartItem.product.images[0]
                                                "
                                                :src="
                                                    cartItem.product.images[0]
                                                "
                                                :alt="cartItem.product.name"
                                                class="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                            />
                                            <div
                                                v-else
                                                class="w-full h-full flex items-center justify-center"
                                            >
                                                <UIcon
                                                    name="i-heroicons-photo"
                                                    class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                                                />
                                            </div>
                                        </div>
                                        <!-- Бейдж количества -->
                                        <div
                                            class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-xs"
                                        >
                                            {{ cartItem.quantity }}
                                        </div>
                                    </div>

                                    <!-- Информация о товаре (для мобильных) -->
                                    <div class="flex-1 min-w-0 sm:hidden">
                                        <h3
                                            class="font-bold text-base text-gray-900 dark:text-white mb-1 line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-200"
                                            @click="
                                                navigateToProduct(
                                                    cartItem.product.id
                                                )
                                            "
                                        >
                                            {{ cartItem.product.name }}
                                        </h3>
                                        <p
                                            class="text-emerald-600 dark:text-emerald-400 font-bold text-lg mb-1"
                                        >
                                            {{
                                                formatPrice(
                                                    cartItem.product.price
                                                )
                                            }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Основная информация о товаре (для ПК) -->
                                <div class="flex-1 min-w-0 hidden sm:block">
                                    <h3
                                        class="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-200"
                                        @click="
                                            navigateToProduct(
                                                cartItem.product.id
                                            )
                                        "
                                    >
                                        {{ cartItem.product.name }}
                                    </h3>
                                    <p
                                        class="text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-2"
                                    >
                                        {{
                                            formatPrice(cartItem.product.price)
                                        }}
                                    </p>
                                    <p
                                        v-if="cartItem.product.description"
                                        class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2"
                                    >
                                        {{ cartItem.product.description }}
                                    </p>
                                </div>

                                <!-- Управление количеством и удаление -->
                                <div
                                    class="flex flex-col sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto gap-3 sm:gap-4"
                                >
                                    <!-- Верхняя часть: удаление и общая цена на мобильных -->
                                    <div
                                        class="flex justify-between items-center w-full sm:w-auto"
                                    >
                                        <!-- Удаление (на мобильных всегда видно) -->
                                        <UButton
                                            icon="i-heroicons-trash"
                                            color="error"
                                            variant="ghost"
                                            size="sm"
                                            class="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                                            @click="
                                                removeFromCart(
                                                    cartItem.product.id
                                                )
                                            "
                                        >
                                            <span class="hidden sm:inline"
                                                >Удалить</span
                                            >
                                        </UButton>

                                        <!-- Общая стоимость товара (на мобильных) -->
                                        <p
                                            class="font-bold text-lg text-gray-900 dark:text-white sm:hidden"
                                        >
                                            {{
                                                formatPrice(
                                                    cartItem.product.price *
                                                        cartItem.quantity
                                                )
                                            }}
                                        </p>
                                    </div>

                                    <!-- Управление количеством -->
                                    <div
                                        class="flex flex-col items-end gap-3 w-full sm:w-auto"
                                    >
                                        <div
                                            class="flex items-center justify-between sm:justify-start w-full sm:w-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1"
                                        >
                                            <UButton
                                                icon="i-heroicons-minus"
                                                size="xs"
                                                variant="ghost"
                                                :disabled="
                                                    cartItem.quantity <= 1
                                                "
                                                @click="
                                                    updateQuantity(
                                                        cartItem.product.id,
                                                        cartItem.quantity - 1
                                                    )
                                                "
                                                class="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            />

                                            <span
                                                class="w-8 text-center font-bold text-gray-900 dark:text-white"
                                            >
                                                {{ cartItem.quantity }}
                                            </span>

                                            <UButton
                                                icon="i-heroicons-plus"
                                                size="xs"
                                                variant="ghost"
                                                @click="
                                                    updateQuantity(
                                                        cartItem.product.id,
                                                        cartItem.quantity + 1
                                                    )
                                                "
                                                class="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            />
                                        </div>

                                        <!-- Общая стоимость товара (для ПК) -->
                                        <p
                                            class="font-bold text-xl text-gray-900 dark:text-white hidden sm:block"
                                        >
                                            {{
                                                formatPrice(
                                                    cartItem.product.price *
                                                        cartItem.quantity
                                                )
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Итоги и оформление -->
            <div class="xl:col-span-1 space-y-4 sm:space-y-6">
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 top-6"
                >
                    <h3
                        class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
                    >
                        Итоги заказа
                    </h3>

                    <div class="space-y-3 sm:space-y-4">
                        <div class="flex justify-between items-center">
                            <span
                                class="text-sm sm:text-base text-gray-600 dark:text-gray-400"
                                >Товары ({{ totalItems }})</span
                            >
                            <span
                                class="font-semibold text-gray-900 dark:text-white"
                                >{{ formatPrice(totalPrice) }}</span
                            >
                        </div>

                        <div class="flex justify-between items-center">
                            <span
                                class="text-sm sm:text-base text-gray-600 dark:text-gray-400"
                                >Доставка</span
                            >
                            <span class="text-emerald-600 font-semibold"
                                >Бесплатно</span
                            >
                        </div>

                        <UDivider />

                        <div
                            class="flex justify-between items-center text-lg sm:text-xl font-bold"
                        >
                            <span class="text-gray-900 dark:text-white"
                                >Итого</span
                            >
                            <span class="text-emerald-600">{{
                                formatPrice(totalPrice)
                            }}</span>
                        </div>
                    </div>

                    <UButton
                        block
                        size="lg"
                        color="primary"
                        class="mt-4 sm:mt-6 transition-all duration-300 h-12 sm:h-14 text-base sm:text-lg font-semibold"
                        @click="navigateTo('/checkout')"
                        :disabled="cart.length === 0"
                    >
                        Оформить заказ
                    </UButton>

                    <UButton
                        block
                        variant="outline"
                        color="neutral"
                        class="mt-3 h-10 sm:h-12"
                        @click="clearCart"
                    >
                        <span class="hidden sm:inline">Очистить корзину</span>
                        <span class="sm:hidden">Очистить</span>
                    </UButton>
                </div>

                <!-- Дополнительная информация -->
                <div
                    class="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-200 dark:border-emerald-800"
                >
                    <div class="flex items-start gap-3">
                        <UIcon
                            name="i-heroicons-shield-check"
                            class="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1 flex-shrink-0"
                        />
                        <div>
                            <h4
                                class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1"
                            >
                                Безопасная оплата
                            </h4>
                            <p
                                class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                            >
                                Все платежи защищены и зашифрованы
                            </p>
                        </div>
                    </div>
                </div>
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

// Функция для перехода на страницу товара
const navigateToProduct = (productId: string) => {
    navigateTo(`/products/${productId}`);
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Мобильная адаптация не затрагивает ПК стили */
@media (min-width: 1280px) {
    /* ПК стили остаются как у вас */
}
</style>
