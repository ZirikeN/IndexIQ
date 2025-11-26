<template>
    <UFooter
        class="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative"
    >
        <!-- Кнопка "Наверх" -->
        <UButton
            icon="i-heroicons-arrow-up-20-solid"
            color="primary"
            variant="solid"
            class="absolute flex items-center justify-center cursor-pointer bottom-6 right-6 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            @click="scrollToTop"
            aria-label="Вернуться наверх"
        />

        <div class="max-w-7xl mx-auto px-4 py-8">
            <!-- Основная секция -->
            <div
                class="grid grid-cols-12 gap-8 pb-8 border-b border-gray-200 dark:border-gray-800"
            >
                <!-- Лого и описание -->
                <div class="col-span-4 space-y-4">
                    <div class="flex items-center gap-3 text-2xl font-bold">
                        <UILogo class="w-[120px] h-10" />
                    </div>
                    <p
                        class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                    >
                        Лучший выбор качественных товаров по доступным ценам. Мы
                        заботимся о каждом нашем клиенте.
                    </p>
                    <div class="flex gap-2">
                        <UButton
                            icon="i-simple-icons-telegram"
                            color="primary"
                            variant="soft"
                            to="https://t.me/yourshop"
                            target="_blank"
                            aria-label="Telegram"
                            class="transition-all duration-200 hover:scale-110"
                        />
                        <UButton
                            icon="i-simple-icons-vk"
                            color="primary"
                            variant="soft"
                            to="https://vk.com/yourshop"
                            target="_blank"
                            aria-label="VKontakte"
                            class="transition-all duration-200 hover:scale-110"
                        />
                        <UButton
                            icon="i-simple-icons-whatsapp"
                            color="primary"
                            variant="soft"
                            to="https://wa.me/79999999999"
                            target="_blank"
                            aria-label="WhatsApp"
                            class="transition-all duration-200 hover:scale-110"
                        />
                    </div>
                </div>

                <!-- Навигационные ссылки -->
                <div class="col-span-4 grid grid-cols-3 gap-6">
                    <div class="space-y-3">
                        <h4
                            class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-3"
                        >
                            Магазин
                        </h4>
                        <ULink
                            v-for="item in shopLinks"
                            :key="item.label"
                            :to="item.to"
                            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                        >
                            {{ item.label }}
                        </ULink>
                    </div>

                    <div class="space-y-3">
                        <h4
                            class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-3"
                        >
                            Помощь
                        </h4>
                        <ULink
                            v-for="item in helpLinks"
                            :key="item.label"
                            :to="item.to"
                            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                        >
                            {{ item.label }}
                        </ULink>
                    </div>

                    <div class="space-y-3">
                        <h4
                            class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-3"
                        >
                            Компания
                        </h4>
                        <ULink
                            v-for="item in companyLinks"
                            :key="item.label"
                            :to="item.to"
                            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                        >
                            {{ item.label }}
                        </ULink>
                    </div>
                </div>

                <!-- Контактная информация -->
                <div class="col-span-4 space-y-4">
                    <h4
                        class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-3"
                    >
                        Контакты
                    </h4>
                    <div class="space-y-2">
                        <div
                            class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm"
                        >
                            <UIcon
                                name="i-heroicons-phone"
                                class="w-4 h-4 text-primary"
                            />
                            <span>+7 (999) 999-99-99</span>
                        </div>
                        <div
                            class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm"
                        >
                            <UIcon
                                name="i-heroicons-envelope"
                                class="w-4 h-4 text-primary"
                            />
                            <span>info@yourshop.ru</span>
                        </div>
                        <div
                            class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm"
                        >
                            <UIcon
                                name="i-heroicons-clock"
                                class="w-4 h-4 text-primary"
                            />
                            <span>Ежедневно 9:00 - 21:00</span>
                        </div>
                    </div>

                    <UButton
                        icon="i-heroicons-chat-bubble-left-right"
                        color="primary"
                        variant="solid"
                        class="w-full mt-4"
                    >
                        Онлайн-поддержка
                    </UButton>
                </div>
            </div>

            <!-- Нижняя секция -->
            <div class="flex items-center justify-between gap-4 pt-6">
                <div class="text-gray-600 dark:text-gray-400 text-sm">
                    <p>
                        © {{ new Date().getFullYear() }} YourShop. Все права
                        защищены.
                    </p>
                </div>

                <div class="flex gap-4">
                    <ULink
                        v-for="item in legalLinks"
                        :key="item.label"
                        :to="item.to"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm"
                    >
                        {{ item.label }}
                    </ULink>
                </div>

                <div class="flex items-center gap-2">
                    <div class="flex gap-3">
                        <UIcon
                            name="i-simple-icons-visa"
                            class="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        />
                        <UIcon
                            name="i-simple-icons-mastercard"
                            class="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        />
                        <UIcon
                            name="i-simple-icons-mir"
                            class="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        />
                        <UIcon
                            name="i-simple-icons-sberbank"
                            class="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    </UFooter>
</template>

<script setup lang="ts">
interface FooterLink {
    label: string;
    to: string;
}

const shopLinks: FooterLink[] = [
    { label: "Все товары", to: "/products" },
    { label: "Новинки", to: "/products?filter=new" },
    { label: "Распродажа", to: "/products?filter=sale" },
    { label: "Популярное", to: "/products?filter=popular" },
    { label: "Бренды", to: "/brands" },
];

const helpLinks: FooterLink[] = [
    { label: "Доставка и оплата", to: "/delivery" },
    { label: "Возврат и обмен", to: "/returns" },
    { label: "Частые вопросы", to: "/faq" },
    { label: "Гарантия", to: "/warranty" },
    { label: "Отзывы", to: "/reviews" },
];

const companyLinks: FooterLink[] = [
    { label: "О нас", to: "/about" },
    { label: "Контакты", to: "/contacts" },
    { label: "Вакансии", to: "/careers" },
    { label: "Партнерство", to: "/partnership" },
    { label: "Новости", to: "/news" },
];

const legalLinks: FooterLink[] = [
    { label: "Политика конфиденциальности", to: "/privacy" },
    { label: "Пользовательское соглашение", to: "/terms" },
    { label: "Оферта", to: "/offer" },
];

// Функция для плавного скролла наверх
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
</script>
