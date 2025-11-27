<template>
    <div class="container mx-auto p-4 max-w-7xl">
        <!-- Заголовок -->
        <div class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Личный кабинет
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">
                Управление вашими заказами и избранными товарами
            </p>
        </div>

        <div v-if="user" class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <!-- Боковая панель с навигацией -->
            <div class="xl:col-span-1">
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6"
                >
                    <!-- Статистика -->
                    <div class="text-center mb-6">
                        <div
                            class="w-20 h-20 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <UIcon
                                name="i-heroicons-user-circle"
                                class="w-10 h-10 text-primary"
                            />
                        </div>
                        <h3
                            class="font-bold text-gray-900 dark:text-white text-lg mb-1"
                        >
                            {{ user.email }}
                        </h3>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">
                            Пользователь
                        </p>
                    </div>

                    <!-- Навигация -->
                    <nav class="space-y-2">
                        <button
                            v-for="item in tabItems"
                            :key="item.value"
                            @click="selectedTab = item.value"
                            :class="[
                                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-medium',
                                selectedTab === item.value
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                            ]"
                        >
                            <UIcon
                                :name="item.icon"
                                class="w-5 h-5 flex-shrink-0"
                            />
                            <span>{{ item.label }}</span>
                            <UBadge
                                v-if="item.badge"
                                :color="item.badgeColor"
                                variant="subtle"
                                size="sm"
                                class="ml-auto"
                            >
                                {{ item.badge }}
                            </UBadge>
                        </button>
                    </nav>

                    <!-- Статистика -->
                    <div
                        class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                    >
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p class="text-2xl font-bold text-primary">
                                    {{ favorites.length }}
                                </p>
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    Избранных
                                </p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-emerald-600">
                                    {{ orders.length }}
                                </p>
                                <p
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    Заказов
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Основное содержимое -->
            <div class="xl:col-span-3">
                <!-- Профиль -->
                <div v-if="selectedTab === 'profile'" class="space-y-6">
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                    >
                        <div class="flex items-center gap-3 mb-8">
                            <UIcon
                                name="i-heroicons-user-circle"
                                class="w-7 h-7 text-primary"
                            />
                            <h2
                                class="text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                Информация о профиле
                            </h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-1">
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400 font-medium"
                                >
                                    Email
                                </p>
                                <p
                                    class="font-semibold text-lg text-gray-900 dark:text-white"
                                >
                                    {{ user.email }}
                                </p>
                            </div>
                            <div class="space-y-1">
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400 font-medium"
                                >
                                    ID пользователя
                                </p>
                                <p
                                    class="font-medium text-sm text-gray-600 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
                                >
                                    {{ user.id }}
                                </p>
                            </div>
                            <div class="space-y-1">
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400 font-medium"
                                >
                                    Дата регистрации
                                </p>
                                <p
                                    class="font-semibold text-gray-900 dark:text-white"
                                >
                                    {{ formatDate(user.created_at) }}
                                </p>
                            </div>
                            <div class="space-y-1">
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400 font-medium"
                                >
                                    Последний вход
                                </p>
                                <p
                                    class="font-semibold text-gray-900 dark:text-white"
                                >
                                    {{ formatDate(user.last_sign_in_at) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Заказы -->
                <div v-else-if="selectedTab === 'orders'" class="space-y-6">
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                    >
                        <div class="flex justify-between items-center mb-8">
                            <div class="flex items-center gap-3">
                                <UIcon
                                    name="i-heroicons-shopping-bag"
                                    class="w-7 h-7 text-primary"
                                />
                                <h2
                                    class="text-2xl font-bold text-gray-900 dark:text-white"
                                >
                                    Мои заказы
                                </h2>
                            </div>
                            <UButton
                                @click="loadOrders"
                                variant="outline"
                                size="lg"
                                :loading="loading"
                                icon="i-heroicons-arrow-path"
                                class="transition-all duration-300"
                            >
                                Обновить
                            </UButton>
                        </div>

                        <div v-if="loading" class="flex justify-center py-12">
                            <UButton loading size="xl"
                                >Загрузка заказов...</UButton
                            >
                        </div>

                        <div v-else-if="error" class="text-center py-12">
                            <div class="max-w-md mx-auto">
                                <UIcon
                                    name="i-heroicons-exclamation-triangle"
                                    class="w-16 h-16 text-red-400 mx-auto mb-4"
                                />
                                <h3
                                    class="text-xl font-semibold text-red-600 dark:text-red-400 mb-3"
                                >
                                    Ошибка загрузки
                                </h3>
                                <p class="text-red-500 dark:text-red-300 mb-6">
                                    {{ error }}
                                </p>
                                <UButton
                                    @click="loadOrders"
                                    icon="i-heroicons-arrow-path"
                                    size="lg"
                                >
                                    Попробовать снова
                                </UButton>
                            </div>
                        </div>

                        <div
                            v-else-if="orders.length === 0"
                            class="text-center py-12"
                        >
                            <div class="max-w-md mx-auto">
                                <UIcon
                                    name="i-heroicons-shopping-bag"
                                    class="w-16 h-16 text-gray-300 mx-auto mb-4"
                                />
                                <h3
                                    class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-3"
                                >
                                    Заказов пока нет
                                </h3>
                                <p
                                    class="text-gray-500 dark:text-gray-400 mb-6 text-lg"
                                >
                                    Сделайте свой первый заказ!
                                </p>
                                <UButton
                                    to="/products"
                                    icon="i-heroicons-shopping-cart"
                                    size="xl"
                                    color="primary"
                                >
                                    Перейти к покупкам
                                </UButton>
                            </div>
                        </div>

                        <div v-else class="space-y-6">
                            <div
                                v-for="order in orders"
                                :key="order.id"
                                class="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
                            >
                                <!-- Заголовок заказа -->
                                <div
                                    class="flex justify-between items-start mb-6"
                                >
                                    <div>
                                        <h3
                                            class="font-bold text-2xl text-primary mb-2"
                                        >
                                            Заказ #{{
                                                getOrderNumber(order.id)
                                            }}
                                        </h3>
                                        <p
                                            class="text-gray-500 dark:text-gray-400"
                                        >
                                            {{ formatDate(order.created_at) }}
                                        </p>
                                    </div>
                                    <div class="text-right">
                                        <UBadge
                                            :color="
                                                getStatusColor(order.status)
                                            "
                                            variant="subtle"
                                            size="lg"
                                            class="mb-3"
                                        >
                                            {{ getStatusText(order.status) }}
                                        </UBadge>
                                        <p
                                            class="text-2xl font-bold text-gray-900 dark:text-white"
                                        >
                                            {{
                                                formatPrice(order.total_amount)
                                            }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Товары в заказе -->
                                <div class="space-y-4 mb-6">
                                    <div
                                        v-for="(item, index) in order.items"
                                        :key="index"
                                        class="flex items-center gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 group"
                                    >
                                        <div
                                            class="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"
                                        >
                                            <span
                                                class="text-sm font-bold text-primary"
                                            >
                                                {{ item.quantity }}
                                            </span>
                                        </div>

                                        <div class="flex-1 min-w-0">
                                            <p
                                                class="font-semibold text-gray-900 dark:text-white text-lg"
                                            >
                                                {{ item.product_name }}
                                            </p>
                                            <p
                                                class="text-gray-500 dark:text-gray-400"
                                            >
                                                {{
                                                    formatPrice(
                                                        item.product_price
                                                    )
                                                }}
                                                за шт.
                                            </p>
                                        </div>

                                        <p
                                            class="font-bold text-lg text-gray-900 dark:text-white"
                                        >
                                            {{ formatPrice(item.subtotal) }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Информация о доставке -->
                                <div
                                    class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm border-t dark:border-gray-700 pt-6"
                                >
                                    <div>
                                        <p
                                            class="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 text-xs"
                                        >
                                            Адрес доставки
                                        </p>
                                        <p
                                            class="text-gray-900 dark:text-white text-base"
                                        >
                                            {{ order.delivery_city }},
                                            {{ order.delivery_address }}
                                        </p>
                                        <p
                                            v-if="order.delivery_postal_code"
                                            class="text-gray-500 dark:text-gray-400"
                                        >
                                            Индекс:
                                            {{ order.delivery_postal_code }}
                                        </p>
                                    </div>

                                    <div>
                                        <p
                                            class="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 text-xs"
                                        >
                                            Получатель
                                        </p>
                                        <p
                                            class="text-gray-900 dark:text-white text-base"
                                        >
                                            {{ order.customer_name }}
                                        </p>
                                        <p
                                            class="text-gray-500 dark:text-gray-400"
                                        >
                                            {{ order.customer_phone }}
                                        </p>
                                        <p
                                            class="text-gray-400 dark:text-gray-500 text-xs"
                                        >
                                            {{ order.customer_email }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Комментарий -->
                                <div
                                    v-if="order.comment"
                                    class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                                >
                                    <p
                                        class="font-semibold text-blue-800 dark:text-blue-300 mb-2"
                                    >
                                        Комментарий к заказу:
                                    </p>
                                    <p class="text-blue-700 dark:text-blue-200">
                                        {{ order.comment }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Избранное -->
                <div v-else-if="selectedTab === 'favorites'">
                    <FavoritesTab />
                </div>
            </div>
        </div>

        <!-- Не авторизован -->
        <div v-else class="text-center py-16">
            <div class="max-w-md mx-auto">
                <div
                    class="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <UIcon
                        name="i-heroicons-exclamation-triangle"
                        class="w-16 h-16 text-orange-500"
                    />
                </div>
                <h2
                    class="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                >
                    Доступ ограничен
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    Войдите в систему, чтобы просмотреть свои заказы
                </p>
                <UButton
                    to="/auth"
                    size="xl"
                    color="primary"
                    icon="i-heroicons-arrow-right-on-rectangle"
                    class="transition-all duration-300"
                >
                    Войти в аккаунт
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();
const { user } = useAuth();
const { favorites } = useFavorites();

const selectedTab = ref("profile");
const tabItems = [
    {
        value: "profile",
        label: "Профиль",
        icon: "i-heroicons-user-circle",
        badge: null,
    },
    {
        value: "orders",
        label: "Мои заказы",
        icon: "i-heroicons-shopping-bag",
        badge: null,
        badgeColor: "emerald",
    },
    {
        value: "favorites",
        label: "Избранное",
        icon: "i-heroicons-heart",
        badge: null,
        badgeColor: "red",
    },
];

// Обновляем бейджи
watch([favorites], () => {
    tabItems[2].badge = favorites.length > 0 ? favorites.length : null;
});

const orders = ref([]);
const loading = ref(false);
const error = ref("");

const getOrderNumber = (orderId) => {
    if (!orderId) return "---";
    return typeof orderId === "string" ? orderId.slice(0, 8) : orderId;
};

const loadOrders = async () => {
    if (!user.value) {
        error.value = "Пользователь не авторизован";
        return;
    }

    loading.value = true;
    error.value = "";

    try {
        const { data: userOrders, error: userError } = await $supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.value.id)
            .order("created_at", { ascending: false });

        if (userError) throw userError;

        orders.value = userOrders || [];
        tabItems[1].badge =
            orders.value.length > 0 ? orders.value.length : null;
    } catch (err) {
        error.value = err.message || "Не удалось загрузить заказы";
    } finally {
        loading.value = false;
    }
};

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

const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

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

onMounted(() => {
    if (user.value) {
        loadOrders();
    }
});

watch(user, (newUser) => {
    if (newUser) {
        loadOrders();
    } else {
        orders.value = [];
    }
});
</script>
