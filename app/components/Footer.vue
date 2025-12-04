<template>
    <UFooter
        class="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 relative"
    >
        <!-- Кнопка "Наверх" -->
        <UButton
            icon="i-heroicons-arrow-up-20-solid"
            color="primary"
            variant="solid"
            class="fixed flex items-center justify-center cursor-pointer bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
            @click="scrollToTop"
            aria-label="Вернуться наверх"
        />

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <!-- Основная секция -->
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 pb-6 md:pb-8 border-b border-gray-200 dark:border-gray-800"
            >
                <!-- Лого и описание -->
                <div
                    class="lg:col-span-4 space-y-4 order-1 md:order-1 lg:order-1"
                >
                    <div class="flex items-center gap-3">
                        <UILogo class="w-[100px] md:w-[120px] h-8 md:h-10" />
                    </div>
                    <p
                        class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md"
                    >
                        Лучший выбор качественных товаров по доступным ценам. Мы
                        заботимся о каждом нашем клиенте.
                    </p>
                    <div class="flex gap-2">
                        <UButton
                            icon="i-simple-icons-telegram"
                            color="primary"
                            variant="soft"
                            size="sm"
                            to="https://t.me/yourshop"
                            target="_blank"
                            aria-label="Telegram"
                            class="transition-all duration-200 hover:scale-110"
                        />
                        <UButton
                            icon="i-simple-icons-vk"
                            color="primary"
                            variant="soft"
                            size="sm"
                            to="https://vk.com/yourshop"
                            target="_blank"
                            aria-label="VKontakte"
                            class="transition-all duration-200 hover:scale-110"
                        />
                        <UButton
                            icon="i-simple-icons-whatsapp"
                            color="primary"
                            variant="soft"
                            size="sm"
                            to="https://wa.me/79999999999"
                            target="_blank"
                            aria-label="WhatsApp"
                            class="transition-all duration-200 hover:scale-110"
                        />
                    </div>
                </div>

                <!-- Навигационные ссылки (аккордеон на мобильных) -->
                <div
                    class="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 order-3 md:order-2 lg:order-2 mt-6 md:mt-0"
                >
                    <!-- Магазин -->
                    <div class="space-y-3">
                        <UAccordion
                            :items="[{ label: 'Магазин', content: '' }]"
                            :ui="{
                                wrapper: 'w-full',
                                item: {
                                    base: 'w-full',
                                },
                            }"
                            class="lg:hidden"
                        >
                            <template #default>
                                <div
                                    class="flex items-center justify-between w-full cursor-pointer"
                                >
                                    <h4
                                        class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider"
                                    >
                                        Магазин
                                    </h4>
                                </div>
                            </template>
                            <template #content>
                                <div class="pt-3 space-y-2">
                                    <ULink
                                        v-for="item in shopLinks"
                                        :key="item.label"
                                        :to="item.to"
                                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                                    >
                                        {{ item.label }}
                                    </ULink>
                                </div>
                            </template>
                        </UAccordion>

                        <!-- Десктопная версия -->
                        <div class="hidden lg:block">
                            <h4
                                class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-3"
                            >
                                Магазин
                            </h4>
                            <div class="space-y-2">
                                <ULink
                                    v-for="item in shopLinks"
                                    :key="item.label"
                                    :to="item.to"
                                    class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                                >
                                    {{ item.label }}
                                </ULink>
                            </div>
                        </div>
                    </div>

                    <!-- Помощь -->
                    <div class="space-y-3">
                        <UAccordion
                            :items="[{ label: 'Помощь', content: '' }]"
                            :ui="{
                                wrapper: 'w-full',
                                item: {
                                    base: 'w-full',
                                },
                            }"
                            class="lg:hidden"
                        >
                            <template #default>
                                <div
                                    class="flex items-center justify-between w-full cursor-pointer"
                                >
                                    <h4
                                        class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider"
                                    >
                                        Помощь
                                    </h4>
                                </div>
                            </template>
                            <template #content>
                                <div class="pt-3 space-y-2">
                                    <ULink
                                        v-for="item in helpLinks"
                                        :key="item.label"
                                        :to="item.to"
                                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                                    >
                                        {{ item.label }}
                                    </ULink>
                                </div>
                            </template>
                        </UAccordion>

                        <!-- Десктопная версия -->
                        <div class="hidden lg:block">
                            <h4
                                class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-3"
                            >
                                Помощь
                            </h4>
                            <div class="space-y-2">
                                <ULink
                                    v-for="item in helpLinks"
                                    :key="item.label"
                                    :to="item.to"
                                    class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                                >
                                    {{ item.label }}
                                </ULink>
                            </div>
                        </div>
                    </div>

                    <!-- Компания -->
                    <div class="space-y-3">
                        <UAccordion
                            :items="[{ label: 'Компания', content: '' }]"
                            :ui="{
                                wrapper: 'w-full',
                                item: {
                                    base: 'w-full',
                                },
                            }"
                            class="lg:hidden"
                        >
                            <template #default>
                                <div
                                    class="flex items-center justify-between w-full cursor-pointer"
                                >
                                    <h4
                                        class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider"
                                    >
                                        Компания
                                    </h4>
                                </div>
                            </template>
                            <template #content>
                                <div class="pt-3 space-y-2">
                                    <ULink
                                        v-for="item in companyLinks"
                                        :key="item.label"
                                        :to="item.to"
                                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1"
                                    >
                                        {{ item.label }}
                                    </ULink>
                                </div>
                            </template>
                        </UAccordion>

                        <!-- Десктопная версия -->
                        <div class="hidden lg:block">
                            <h4
                                class="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-3"
                            >
                                Компания
                            </h4>
                            <div class="space-y-2">
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
                    </div>
                </div>

                <!-- Контактная информация -->
                <div
                    class="lg:col-span-4 space-y-4 order-2 md:order-3 lg:order-3"
                >
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
                                class="w-4 h-4 text-primary flex-shrink-0"
                            />
                            <a
                                href="tel:+79999999999"
                                class="hover:text-primary transition-colors"
                            >
                                +7 (999) 999-99-99
                            </a>
                        </div>
                        <div
                            class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm"
                        >
                            <UIcon
                                name="i-heroicons-envelope"
                                class="w-4 h-4 text-primary flex-shrink-0"
                            />
                            <a
                                href="mailto:info@yourshop.ru"
                                class="hover:text-primary transition-colors"
                            >
                                info@yourshop.ru
                            </a>
                        </div>
                        <div
                            class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm"
                        >
                            <UIcon
                                name="i-heroicons-clock"
                                class="w-4 h-4 text-primary flex-shrink-0"
                            />
                            <span>Ежедневно 9:00 - 21:00</span>
                        </div>
                    </div>

                    <UButton
                        icon="i-heroicons-chat-bubble-left-right"
                        color="primary"
                        variant="solid"
                        class="w-full mt-4 text-sm md:text-base"
                        size="sm"
                    >
                        Онлайн-поддержка
                    </UButton>
                </div>
            </div>

            <!-- Нижняя секция -->
            <div
                class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pt-6"
            >
                <div
                    class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm text-center md:text-left order-2 md:order-1"
                >
                    <p>
                        © {{ new Date().getFullYear() }} YourShop. Все права
                        защищены.
                    </p>
                </div>

                <!-- Юридические ссылки -->
                <div
                    class="flex flex-wrap justify-center gap-3 md:gap-4 order-1 md:order-2"
                >
                    <ULink
                        v-for="item in legalLinks"
                        :key="item.label"
                        :to="item.to"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
                    >
                        {{ item.label }}
                    </ULink>
                </div>

                <!-- Платежные системы -->
                <div class="flex items-center gap-2 order-3 mt-2 md:mt-0">
                    <div class="flex gap-2 sm:gap-3">
                        <UIcon
                            name="i-simple-icons-visa"
                            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        />
                        <UIcon
                            name="i-simple-icons-mastercard"
                            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        />
                        <UIcon
                            name="i-simple-icons-mir"
                            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        />
                        <UIcon
                            name="i-simple-icons-sberbank"
                            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
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

<style scoped>
/* Адаптивные стили для аккордеонов */
@media (max-width: 1024px) {
    .u-accordion {
        border-bottom: 1px solid rgb(229 231 235);
    }

    .dark .u-accordion {
        border-bottom-color: rgb(31 41 55);
    }
}

/* Улучшения для очень маленьких экранов */
@media (max-width: 360px) {
    .text-xs {
        font-size: 0.7rem;
    }

    .gap-2 {
        gap: 0.25rem;
    }
}

/* Улучшение тач-интерфейса */
@media (hover: none) and (pointer: coarse) {
    .hover\\:scale-110:hover {
        transform: none;
    }

    :deep(.u-button) {
        min-height: 44px;
    }
}

/* Стилизация стрелки аккордеона */
:deep(.u-accordion-item__chevron) {
    color: rgb(107 114 128);
    transition: transform 0.2s ease;
}

.dark :deep(.u-accordion-item__chevron) {
    color: rgb(156 163 175);
}
</style>
