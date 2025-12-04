<template>
    <UHeader class="h-auto md:h-[100px] py-3 md:py-0 px-4 sm:px-6">
        <template #left>
            <div
                class="flex items-center flex-nowrap gap-3 md:gap-4 lg:gap-6 w-full max-w-full overflow-hidden"
            >
                <div class="flex-shrink-0">
                    <UILogo class="w-[100px] md:w-[120px] h-8 md:h-10" />
                </div>

                <div class="flex-shrink-0 ml-auto md:ml-0">
                    <div
                        class="transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <nuxt-link
                            to="/products"
                            class="inline-flex items-center text-sm md:text-base lg:text-[22px] bg-inverted text-inverted py-2 px-3 md:py-3 md:px-4 rounded-lg md:rounded-xl font-medium whitespace-nowrap"
                            >Каталог</nuxt-link
                        >
                    </div>
                </div>
            </div>
        </template>

        <template #right>
            <!-- Навигация для десктопа -->
            <div class="hidden lg:flex items-center space-x-4 xl:space-x-6">
                <UNavigationMenu :items="items" class="flex" />

                <div class="flex items-center space-x-2 lg:space-x-4">
                    <UColorModeButton />

                    <UButton
                        v-if="user"
                        variant="ghost"
                        color="error"
                        @click="handleSignOut"
                        :loading="isSigningOut"
                        class="hidden xl:inline-flex"
                    >
                        <UIcon
                            name="i-heroicons-arrow-left-on-rectangle"
                            class="w-5 h-5"
                        />
                        <span class="ml-2">Выйти</span>
                    </UButton>

                    <!-- Компактная кнопка выхода для средних экранов -->
                    <UButton
                        v-if="user"
                        variant="ghost"
                        color="error"
                        @click="handleSignOut"
                        :loading="isSigningOut"
                        class="xl:hidden"
                    >
                        <UIcon
                            name="i-heroicons-arrow-left-on-rectangle"
                            class="w-5 h-5"
                        />
                    </UButton>
                </div>
            </div>

            <!-- Мобильная навигация -->
            <div class="flex items-center space-x-3 lg:hidden">
                <UColorModeButton size="sm" />

                <!-- Иконка корзины для мобильных -->
                <nuxt-link
                    to="/cart"
                    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6" />
                </nuxt-link>
            </div>
        </template>

        <template #body>
            <!-- Мобильное меню -->
            <div class="py-4 px-4">
                <!-- Основные пункты меню -->
                <div class="space-y-1">
                    <UNavigationMenu
                        :items="items"
                        orientation="vertical"
                        class="-mx-2.5"
                    />
                </div>

                <!-- Выход для мобильных -->
                <div
                    v-if="user"
                    class="mt-6 pt-6 border-t dark:border-gray-800"
                >
                    <UButton
                        variant="ghost"
                        color="warning"
                        block
                        @click="handleSignOut"
                        :loading="isSigningOut"
                        size="lg"
                    >
                        <UIcon
                            name="i-heroicons-arrow-left-on-rectangle"
                            class="w-6 h-6"
                        />
                        <span class="ml-2">Выйти</span>
                    </UButton>
                </div>
            </div>
        </template>
    </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { computed, ref } from "vue";

const { user, signOut } = useAuth();
const toast = useToast();
const isSigningOut = ref(false);

// Обработка выхода
const handleSignOut = async () => {
    isSigningOut.value = true;
    try {
        await signOut();
        toast.add({
            title: "Вы вышли из аккаунта",
            color: "primary",
        });
    } catch (error) {
        toast.add({
            title: "Ошибка при выходе",
            color: "error",
        });
    } finally {
        isSigningOut.value = false;
    }
};

const items = computed<NavigationMenuItem[]>(() => {
    const baseItems = [
        {
            label: "Избранное",
            icon: "i-heroicons-heart",
            to: "/favorites",
        },
        {
            label: "Корзина",
            icon: "i-heroicons-shopping-cart",
            to: "/cart",
        },
    ];

    if (user.value) {
        baseItems.push({
            label: "Профиль",
            icon: "i-heroicons-user",
            to: "/account",
        });
    } else {
        baseItems.push({
            label: "Войти",
            icon: "i-heroicons-user",
            to: "/auth",
        });
    }

    return baseItems;
});
</script>

<style scoped>
/* Улучшение для очень маленьких экранов */
@media (max-width: 360px) {
    .u-header {
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
    }

    .u-header__left > div {
        gap: 0.5rem !important;
    }
}

/* Улучшение тач-интерфейса на мобильных */
@media (hover: none) and (pointer: coarse) {
    .hover\:-translate-y-0\.5:hover {
        transform: none;
    }

    :deep(.u-button) {
        min-height: 44px;
    }

    :deep(.u-menu-item) {
        min-height: 48px;
    }
}

/* Предотвращение схлопывания элементов */
:deep(.u-header__left),
:deep(.u-header__right) {
    min-width: 0; /* Разрешает сжатие контента */
}

:deep(.u-header__left) {
    flex: 1 1 auto;
}

:deep(.u-header__right) {
    flex: 0 0 auto;
}
</style>
