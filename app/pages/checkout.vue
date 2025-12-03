<template>
    <div class="container mx-auto p-4 max-w-8xl">
        <!-- Заголовок -->
        <div class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Оформление заказа
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">
                Заполните данные для завершения заказа
            </p>
        </div>

        <div v-if="cart.length === 0" class="text-center py-16">
            <div class="max-w-md mx-auto">
                <div
                    class="w-32 h-32 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <UIcon
                        name="i-heroicons-shopping-cart"
                        class="w-16 h-16 text-primary"
                    />
                </div>
                <h2
                    class="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                >
                    Корзина пуста
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    Добавьте товары в корзину перед оформлением заказа
                </p>
                <UButton
                    to="/products"
                    icon="i-heroicons-arrow-left"
                    size="xl"
                    color="primary"
                    class="transition-all duration-300"
                >
                    Вернуться к покупкам
                </UButton>
            </div>
        </div>

        <div v-else class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <!-- Форма оформления заказа -->
            <div class="xl:col-span-3 space-y-6">
                <UForm
                    :schema="orderSchema"
                    :state="formState"
                    @submit="submitOrder"
                    class="space-y-6"
                >
                    <!-- Контактная информация -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                    >
                        <div class="flex items-center gap-3 mb-8">
                            <UIcon
                                name="i-heroicons-user-circle"
                                class="w-7 h-7 text-primary"
                            />
                            <h3
                                class="text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                Контактная информация
                            </h3>
                        </div>

                        <div class="space-y-6">
                            <UFormField
                                label="ФИО"
                                name="fullName"
                                class="text-lg"
                            >
                                <UInput
                                    v-model="formState.fullName"
                                    placeholder="Иванов Иван Иванович"
                                    :disabled="loading"
                                    size="xl"
                                    icon="i-heroicons-user"
                                    class="h-14 text-lg"
                                />
                            </UFormField>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <UFormField
                                    label="Email"
                                    name="email"
                                    class="text-lg"
                                >
                                    <UInput
                                        v-model="formState.email"
                                        type="email"
                                        placeholder="ivanov@example.com"
                                        :disabled="loading"
                                        size="xl"
                                        icon="i-heroicons-envelope"
                                        class="h-14 text-lg"
                                    />
                                </UFormField>

                                <UFormField
                                    label="Телефон"
                                    name="phone"
                                    class="text-lg"
                                >
                                    <UInput
                                        v-model="formState.phone"
                                        type="tel"
                                        placeholder="+7 (999) 999-99-99"
                                        :disabled="loading"
                                        size="xl"
                                        icon="i-heroicons-phone"
                                        class="h-14 text-lg"
                                    />
                                </UFormField>
                            </div>
                        </div>
                    </div>

                    <!-- Адрес доставки -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                    >
                        <div class="flex items-center gap-3 mb-8">
                            <UIcon
                                name="i-heroicons-map-pin"
                                class="w-7 h-7 text-primary"
                            />
                            <h3
                                class="text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                Адрес доставки
                            </h3>
                        </div>

                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <UFormField
                                    label="Город"
                                    name="city"
                                    class="text-lg"
                                >
                                    <UInput
                                        v-model="formState.city"
                                        placeholder="Москва"
                                        :disabled="loading"
                                        size="xl"
                                        icon="i-heroicons-building-office"
                                        class="h-14 text-lg"
                                    />
                                </UFormField>

                                <UFormField
                                    label="Почтовый индекс"
                                    name="postalCode"
                                    class="text-lg"
                                >
                                    <UInput
                                        v-model="formState.postalCode"
                                        placeholder="123456"
                                        :disabled="loading"
                                        size="xl"
                                        icon="i-heroicons-envelope"
                                        class="h-14 text-lg"
                                    />
                                </UFormField>
                            </div>

                            <UFormField
                                label="Адрес"
                                name="address"
                                class="text-lg"
                            >
                                <UTextarea
                                    v-model="formState.address"
                                    placeholder="ул. Примерная, д. 1, кв. 1"
                                    :disabled="loading"
                                    :rows="3"
                                    class="text-lg min-h-[120px] resize-y"
                                    :ui="{
                                        base: 'block w-full resize-y rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200',
                                    }"
                                />
                            </UFormField>
                        </div>
                    </div>

                    <!-- Комментарий к заказу -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                    >
                        <div class="flex items-center gap-3 mb-8">
                            <UIcon
                                name="i-heroicons-chat-bubble-left-ellipsis"
                                class="w-7 h-7 text-primary"
                            />
                            <h3
                                class="text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                Комментарий к заказу
                            </h3>
                        </div>

                        <UFormField name="comment" class="text-lg">
                            <UTextarea
                                v-model="formState.comment"
                                placeholder="Дополнительные пожелания к заказу..."
                                :disabled="loading"
                                :rows="6"
                                class="text-lg min-h-[180px] w-full resize-y"
                                :ui="{
                                    base: 'block w-full resize-y rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200',
                                }"
                            />
                        </UFormField>
                    </div>
                </UForm>
            </div>

            <!-- Информация о заказе -->
            <div class="xl:col-span-1 space-y-6">
                <!-- Товары в заказе -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 top-6"
                >
                    <h3
                        class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        Ваш заказ
                    </h3>

                    <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
                        <div
                            v-for="cartItem in cart"
                            :key="cartItem.product.id"
                            class="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 group"
                        >
                            <div class="relative flex-shrink-0">
                                <div
                                    class="w-16 h-16 rounded-lg overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center p-1 cursor-pointer"
                                    @click="
                                        navigateToProduct(cartItem.product.id)
                                    "
                                >
                                    <NuxtImg
                                        v-if="
                                            cartItem.product.images &&
                                            cartItem.product.images[0]
                                        "
                                        :src="cartItem.product.images[0]"
                                        :alt="cartItem.product.name"
                                        class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div
                                        v-else
                                        class="w-full h-full flex items-center justify-center"
                                    >
                                        <UIcon
                                            name="i-heroicons-photo"
                                            class="w-6 h-6 text-gray-400"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {{ cartItem.quantity }}
                                </div>
                            </div>

                            <div class="flex-1 min-w-0">
                                <p
                                    class="font-medium text-base text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-200"
                                    @click="
                                        navigateToProduct(cartItem.product.id)
                                    "
                                >
                                    {{ cartItem.product.name }}
                                </p>
                                <p
                                    class="text-gray-500 dark:text-gray-400 text-sm"
                                >
                                    {{ cartItem.quantity }} ×
                                    {{ formatPrice(cartItem.product.price) }}
                                </p>
                            </div>

                            <p
                                class="font-semibold text-gray-900 dark:text-white text-base"
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

                    <div
                        class="space-y-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"
                    >
                        <div class="flex justify-between items-center">
                            <span
                                class="text-gray-600 dark:text-gray-400 text-lg"
                                >Товары:</span
                            >
                            <span
                                class="font-semibold text-gray-900 dark:text-white text-lg"
                                >{{ formatPrice(totalPrice) }}</span
                            >
                        </div>
                        <div class="flex justify-between items-center">
                            <span
                                class="text-gray-600 dark:text-gray-400 text-lg"
                                >Доставка:</span
                            >
                            <span class="text-emerald-600 font-semibold text-lg"
                                >Бесплатно</span
                            >
                        </div>
                        <UDivider />
                        <div
                            class="flex justify-between items-center text-xl font-bold"
                        >
                            <span class="text-gray-900 dark:text-white"
                                >Итого:</span
                            >
                            <span class="text-primary">{{
                                formatPrice(totalPrice)
                            }}</span>
                        </div>
                    </div>

                    <UButton
                        block
                        size="xl"
                        color="primary"
                        class="mt-6 transition-all duration-300 h-16 text-xl font-semibold"
                        :loading="loading"
                        @click="submitOrder"
                    >
                        Подтвердить заказ
                    </UButton>

                    <UButton
                        block
                        variant="outline"
                        color="neutral"
                        to="/cart"
                        class="mt-4 h-14 text-lg"
                        :disabled="loading"
                    >
                        Вернуться в корзину
                    </UButton>
                </div>

                <!-- Дополнительная информация -->
                <div
                    class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
                >
                    <div class="flex items-start gap-3">
                        <UIcon
                            name="i-heroicons-lock-closed"
                            class="w-7 h-7 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0"
                        />
                        <div>
                            <h4
                                class="font-semibold text-gray-900 dark:text-white mb-2 text-lg"
                            >
                                Безопасные платежи
                            </h4>
                            <p
                                class="text-base text-gray-600 dark:text-gray-400"
                            >
                                Все данные защищены и зашифрованы
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    object,
    string,
    minLength,
    email,
    regex,
    pipe,
    nonEmpty,
} from "valibot";

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

// Схема валидации с Valibot (исправленная)
const orderSchema = object({
    fullName: pipe(
        string("ФИО обязательно для заполнения"),
        minLength(2, "ФИО должно содержать минимум 2 символа")
    ),
    email: pipe(
        string("Email обязателен для заполнения"),
        nonEmpty("Email обязателен для заполнения"),
        email("Введите корректный email адрес")
    ),
    phone: pipe(
        string("Телефон обязателен для заполнения"),
        nonEmpty("Телефон обязателен для заполнения"),
        regex(
            /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
            "Введите корректный номер телефона"
        )
    ),
    city: pipe(
        string("Город обязателен для заполнения"),
        nonEmpty("Город обязателен для заполнения"),
        minLength(2, "Название города должно содержать минимум 2 символа")
    ),
    address: pipe(
        string("Адрес обязателен для заполнения"),
        nonEmpty("Адрес обязателен для заполнения"),
        minLength(5, "Адрес должен содержать минимум 5 символов")
    ),
    postalCode: pipe(
        string(),
        regex(/^\d{6}$/, "Почтовый индекс должен содержать 6 цифр")
    ),
    comment: string(),
});

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

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

// Функция для перехода на страницу товара
const navigateToProduct = (productId: string) => {
    navigateTo(`/products/${productId}`);
};

// Отправка заказа
const submitOrder = async () => {
    loading.value = true;

    try {
        // Получаем текущие товары из корзины
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
            timeout: 5000,
        });

        // Перенаправляем на страницу подтверждения
        await navigateTo(`/order-confirmation/${order.id}`);
    } catch (error: any) {
        console.error("Ошибка при оформлении заказа:", error);
        toast.add({
            title: "Ошибка при оформлении заказа",
            description: error.message,
            color: "error",
            timeout: 5000,
        });
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
