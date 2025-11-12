<template>
    <div class="container mx-auto p-6">
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold">Личный кабинет</h1>
                    <UBadge v-if="user" color="green" variant="subtle">
                        {{ orders.length }} заказов
                    </UBadge>
                </div>
            </template>

            <div v-if="user" class="space-y-6">
                <!-- Информация о пользователе -->
                <UCard>
                    <template #header>
                        <h2
                            class="text-lg font-semibold flex items-center gap-2"
                        >
                            <UIcon
                                name="i-heroicons-user-circle"
                                class="w-5 h-5"
                            />
                            Информация о профиле
                        </h2>
                    </template>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-500">Email</p>
                            <p class="font-medium">{{ user.email }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">ID пользователя</p>
                            <p class="font-medium text-sm">{{ user.id }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">
                                Дата регистрации
                            </p>
                            <p class="font-medium">
                                {{ formatDate(user.created_at) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Последний вход</p>
                            <p class="font-medium">
                                {{ formatDate(user.last_sign_in_at) }}
                            </p>
                        </div>
                    </div>
                </UCard>

                <!-- История заказов -->
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h2
                                class="text-lg font-semibold flex items-center gap-2"
                            >
                                <UIcon
                                    name="i-heroicons-shopping-bag"
                                    class="w-5 h-5"
                                />
                                Мои заказы
                            </h2>
                            <UButton
                                @click="loadOrders"
                                variant="outline"
                                size="sm"
                                :loading="loading"
                                icon="i-heroicons-arrow-path"
                            >
                                Обновить
                            </UButton>
                        </div>
                    </template>

                    <div v-if="loading" class="flex justify-center py-8">
                        <UButton loading>Загрузка заказов...</UButton>
                    </div>

                    <div v-else-if="error" class="text-center py-8">
                        <UIcon
                            name="i-heroicons-exclamation-triangle"
                            class="w-16 h-16 text-red-300 mx-auto mb-4"
                        />
                        <h3 class="text-lg font-semibold text-red-600 mb-2">
                            Ошибка загрузки
                        </h3>
                        <p class="text-red-500 mb-4">{{ error }}</p>
                        <UButton
                            @click="loadOrders"
                            icon="i-heroicons-arrow-path"
                        >
                            Попробовать снова
                        </UButton>
                    </div>

                    <div
                        v-else-if="orders.length === 0"
                        class="text-center py-8"
                    >
                        <UIcon
                            name="i-heroicons-shopping-bag"
                            class="w-16 h-16 text-gray-300 mx-auto mb-4"
                        />
                        <h3 class="text-lg font-semibold text-gray-600 mb-2">
                            Заказов пока нет
                        </h3>
                        <p class="text-gray-500 mb-4">
                            Сделайте свой первый заказ!
                        </p>
                        <UButton
                            to="/products"
                            icon="i-heroicons-shopping-cart"
                            size="lg"
                        >
                            Перейти к покупкам
                        </UButton>
                    </div>

                    <div v-else class="space-y-4">
                        <div
                            v-for="order in orders"
                            :key="order.id"
                            class="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                        >
                            <!-- Заголовок заказа -->
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3
                                        class="font-semibold text-lg text-primary"
                                    >
                                        Заказ #{{ getOrderNumber(order.id) }}
                                    </h3>
                                    <p class="text-gray-500 text-sm">
                                        {{ formatDate(order.created_at) }}
                                    </p>
                                </div>
                                <div class="text-right">
                                    <UBadge
                                        :color="getStatusColor(order.status)"
                                        variant="subtle"
                                        class="mb-2"
                                    >
                                        {{ getStatusText(order.status) }}
                                    </UBadge>
                                    <p class="text-xl font-bold">
                                        {{ formatPrice(order.total_amount) }}
                                    </p>
                                </div>
                            </div>

                            <!-- Товары в заказе -->
                            <div class="space-y-2 mb-4">
                                <div
                                    v-for="(item, index) in order.items"
                                    :key="index"
                                    class="flex items-center gap-3 py-2"
                                >
                                    <div
                                        class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center"
                                    >
                                        <span
                                            class="text-xs font-medium text-gray-600"
                                        >
                                            {{ item.quantity }}
                                        </span>
                                    </div>

                                    <div class="flex-1 min-w-0">
                                        <p class="font-medium text-sm">
                                            {{ item.product_name }}
                                        </p>
                                        <p class="text-gray-500 text-xs">
                                            {{
                                                formatPrice(item.product_price)
                                            }}
                                            за шт.
                                        </p>
                                    </div>

                                    <p class="font-semibold text-sm">
                                        {{ formatPrice(item.subtotal) }}
                                    </p>
                                </div>
                            </div>

                            <!-- Информация о доставке -->
                            <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t pt-4"
                            >
                                <div>
                                    <p
                                        class="font-semibold text-xs text-gray-500 uppercase tracking-wide mb-1"
                                    >
                                        Адрес доставки
                                    </p>
                                    <p class="text-gray-800">
                                        {{ order.delivery_city }},
                                        {{ order.delivery_address }}
                                    </p>
                                    <p
                                        v-if="order.delivery_postal_code"
                                        class="text-gray-600 text-sm"
                                    >
                                        Индекс: {{ order.delivery_postal_code }}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        class="font-semibold text-xs text-gray-500 uppercase tracking-wide mb-1"
                                    >
                                        Получатель
                                    </p>
                                    <p class="text-gray-800">
                                        {{ order.customer_name }}
                                    </p>
                                    <p class="text-gray-600">
                                        {{ order.customer_phone }}
                                    </p>
                                    <p class="text-gray-500 text-xs">
                                        User ID: {{ order.user_id || "null" }}
                                    </p>
                                </div>
                            </div>

                            <!-- Комментарий -->
                            <div
                                v-if="order.comment"
                                class="mt-3 p-3 bg-blue-50 rounded-lg"
                            >
                                <p
                                    class="font-semibold text-sm mb-1 text-blue-800"
                                >
                                    Комментарий:
                                </p>
                                <p class="text-blue-700 text-sm">
                                    {{ order.comment }}
                                </p>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

            <div v-else class="text-center py-8">
                <UIcon
                    name="i-heroicons-exclamation-triangle"
                    class="w-16 h-16 text-orange-300 mx-auto mb-4"
                />
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                    Доступ ограничен
                </h2>
                <p class="text-gray-600 mb-6">
                    Войдите в систему, чтобы просмотреть свои заказы
                </p>
                <UButton
                    to="/auth"
                    size="lg"
                    icon="i-heroicons-arrow-right-on-rectangle"
                >
                    Войти в аккаунт
                </UButton>
            </div>
        </UCard>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();
const { user } = useAuth();

const orders = ref([]);
const loading = ref(false);
const error = ref("");

// Получение номера заказа
const getOrderNumber = (orderId) => {
    if (!orderId) return "---";
    return typeof orderId === "string"
        ? orderId
        : orderId;
};

// Загрузка заказов пользователя
const loadOrders = async () => {
    if (!user.value) {
        error.value = "Пользователь не авторизован";
        return;
    }

    loading.value = true;
    error.value = "";

    try {
        // Сначала проверим все заказы в системе
        const { data: allOrders, error: allError } = await $supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(10);

        if (allError) throw allError;

        // Теперь загрузим заказы пользователя
        const { data: userOrders, error: userError } = await $supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.value.id)
            .order("created_at", { ascending: false });

        if (userError) throw userError;

        orders.value = userOrders || [];
    } catch (err) {
        error.value = err.message || "Не удалось загрузить заказы";
    } finally {
        loading.value = false;
    }
};

// Загрузка профиля пользователя
const loadProfile = async () => {
    if (!user.value) return;

    try {
        const { data, error } = await $supabase
            .from("profiles")
            .select("*")
            .eq("id", user.value.id)
            .single();

        if (error && error.code !== "PGRST116") {
            console.error("Ошибка загрузки профиля:", error);
        }
    } catch (error) {
        console.error("Ошибка:", error);
    }
};

// Форматирование даты
const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Форматирование цены
const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

// Получение цвета статуса
const getStatusColor = (status) => {
    const statusColors = {
        pending: "orange",
        processing: "blue",
        shipped: "purple",
        delivered: "green",
        cancelled: "red",
    };
    return statusColors[status] || "gray";
};

// Получение текста статуса
const getStatusText = (status) => {
    const statusTexts = {
        pending: "Ожидает обработки",
        processing: "В обработке",
        shipped: "Отправлен",
        delivered: "Доставлен",
        cancelled: "Отменен",
    };
    return statusTexts[status] || status;
};

// Загружаем данные при монтировании
onMounted(() => {
    if (user.value) {
        loadOrders();
        loadProfile();
    }
});

// Следим за изменением пользователя
watch(user, (newUser) => {
    if (newUser) {
        loadOrders();
        loadProfile();
    } else {
        orders.value = [];
    }
});
</script>
