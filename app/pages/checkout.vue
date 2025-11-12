<template>
    <div class="container mx-auto p-4">
        <UPageHeader
            title="Оформление заказа"
            description="Заполните данные для завершения заказа"
            class="mb-8"
        />

        <div v-if="cart.length === 0" class="text-center py-12">
            <UIcon
                name="i-heroicons-shopping-cart"
                class="w-24 h-24 text-gray-300 mx-auto mb-4"
            />
            <h2 class="text-2xl font-bold text-gray-600 mb-2">Корзина пуста</h2>
            <p class="text-gray-500 mb-6">
                Добавьте товары в корзину перед оформлением заказа
            </p>
            <UButton to="/products" icon="i-heroicons-arrow-left" size="lg">
                Вернуться к покупкам
            </UButton>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Форма оформления заказа -->
            <div>
                <UForm
                    :state="formState"
                    @submit="submitOrder"
                    class="space-y-6"
                >
                    <!-- Контактная информация -->
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">
                                Контактная информация
                            </h3>
                        </template>

                        <div class="space-y-4">
                            <UFormField label="ФИО" name="fullName" required>
                                <UInput
                                    v-model="formState.fullName"
                                    placeholder="Иванов Иван Иванович"
                                    :disabled="loading"
                                />
                            </UFormField>

                            <UFormField label="Email" name="email" required>
                                <UInput
                                    v-model="formState.email"
                                    type="email"
                                    placeholder="ivanov@example.com"
                                    :disabled="loading"
                                />
                            </UFormField>

                            <UFormField label="Телефон" name="phone" required>
                                <UInput
                                    v-model="formState.phone"
                                    type="tel"
                                    placeholder="+7 (999) 999-99-99"
                                    :disabled="loading"
                                />
                            </UFormField>
                        </div>
                    </UCard>

                    <!-- Адрес доставки -->
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">
                                Адрес доставки
                            </h3>
                        </template>

                        <div class="space-y-4">
                            <UFormField label="Город" name="city" required>
                                <UInput
                                    v-model="formState.city"
                                    placeholder="Москва"
                                    :disabled="loading"
                                />
                            </UFormField>

                            <UFormField label="Адрес" name="address" required>
                                <UTextarea
                                    v-model="formState.address"
                                    placeholder="ул. Примерная, д. 1, кв. 1"
                                    :disabled="loading"
                                />
                            </UFormField>

                            <UFormField
                                label="Почтовый индекс"
                                name="postalCode"
                            >
                                <UInput
                                    v-model="formState.postalCode"
                                    placeholder="123456"
                                    :disabled="loading"
                                />
                            </UFormField>
                        </div>
                    </UCard>

                    <!-- Комментарий к заказу -->
                    <UCard>
                        <template #header>
                            <h3 class="text-lg font-semibold">
                                Комментарий к заказу
                            </h3>
                        </template>

                        <UFormField name="comment">
                            <UTextarea
                                v-model="formState.comment"
                                placeholder="Дополнительные пожелания к заказу..."
                                :disabled="loading"
                            />
                        </UFormField>
                    </UCard>
                </UForm>
            </div>

            <!-- Информация о заказе -->
            <div class="space-y-6">
                <!-- Товары в заказе -->
                <UCard>
                    <template #header>
                        <h3 class="text-lg font-semibold">Ваш заказ</h3>
                    </template>

                    <div class="space-y-4">
                        <div
                            v-for="cartItem in cart"
                            :key="cartItem.product.id"
                            class="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0"
                        >
                            <NuxtImg
                                v-if="
                                    cartItem.product.images &&
                                    cartItem.product.images[0]
                                "
                                :src="cartItem.product.images[0]"
                                :alt="cartItem.product.name"
                                class="w-12 h-12 object-cover rounded"
                            />
                            <div
                                v-else
                                class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"
                            >
                                <UIcon
                                    name="i-heroicons-photo"
                                    class="w-6 h-6 text-gray-400"
                                />
                            </div>

                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-sm truncate">
                                    {{ cartItem.product.name }}
                                </p>
                                <p class="text-gray-500 text-xs">
                                    {{ cartItem.quantity }} ×
                                    {{ formatPrice(cartItem.product.price) }}
                                </p>
                            </div>

                            <p class="font-semibold">
                                {{
                                    formatPrice(
                                        cartItem.product.price *
                                            cartItem.quantity
                                    )
                                }}
                            </p>
                        </div>
                    </div>

                    <template #footer>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span>Стоимость товаров:</span>
                                <span>{{ formatPrice(totalPrice) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Доставка:</span>
                                <span class="text-green-600">Бесплатно</span>
                            </div>
                            <UDivider />
                            <div class="flex justify-between text-lg font-bold">
                                <span>Итого:</span>
                                <span>{{ formatPrice(totalPrice) }}</span>
                            </div>
                        </div>
                    </template>
                </UCard>

                <!-- Кнопка оформления -->
                <UButton
                    block
                    size="lg"
                    :loading="loading"
                    :disabled="!isFormValid"
                    @click="submitOrder"
                >
                    Подтвердить заказ
                </UButton>

                <UButton block variant="outline" to="/cart" :disabled="loading">
                    Вернуться в корзину
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Типы для корзины
interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    images?: string[];
    specifications?: Record<string, any>;
    package_contents?: string[];
}

interface CartItem {
    product: Product;
    quantity: number;
    addedAt: string;
}

const { $supabase } = useNuxtApp();
const router = useRouter();
const toast = useToast();
const { user } = useAuth();

const { cart, totalPrice, clearCart } = useCart();

const loading = ref(false);

// Состояние формы
const formState = reactive({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
    comment: "",
});

// Валидация формы
const isFormValid = computed(() => {
    return (
        formState.fullName &&
        formState.email &&
        formState.phone &&
        formState.city &&
        formState.address
    );
});

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

// Отправка заказа
const submitOrder = async () => {
    if (!isFormValid.value) {
        toast.add({
            title: "Заполните все обязательные поля",
            color: "error",
        });
        return;
    }

    loading.value = true;

    try {
        // Получаем текущие товары из корзины (cart.value - это массив)
        const currentCart = cart.value;

        // Преобразуем товары для сохранения в заказе
        const cartItems = currentCart.map((cartItem: CartItem) => ({
            product_id: cartItem.product.id,
            product_name: cartItem.product.name,
            product_price: cartItem.product.price,
            quantity: cartItem.quantity,
            subtotal: cartItem.product.price * cartItem.quantity,
        }));

        // Создаем заказ в Supabase
        const { data: order, error } = await $supabase
            .from("orders")
            .insert([
                {
                    customer_name: formState.fullName,
                    customer_email: formState.email,
                    customer_phone: formState.phone,
                    delivery_city: formState.city,
                    delivery_address: formState.address,
                    delivery_postal_code: formState.postalCode,
                    comment: formState.comment,
                    total_amount: totalPrice.value,
                    status: "pending",
                    items: cartItems,
                    user_id: user.value?.id || null,
                },
            ])
            .select()
            .single();

        if (error) throw error;

        // Очищаем корзину
        clearCart();

        // Показываем уведомление
        toast.add({
            title: "Заказ успешно оформлен!",
            description: `Номер вашего заказа: #${order.id}`,
            color: "primary",
        });

        // Перенаправляем на страницу подтверждения
        await navigateTo(`/order-confirmation/${order.id}`);
    } catch (error: any) {
        console.error("Ошибка при оформлении заказа:", error);
        toast.add({
            title: "Ошибка при оформлении заказа",
            description: error.message,
            color: "error",
        });
    } finally {
        loading.value = false;
    }
};
</script>
