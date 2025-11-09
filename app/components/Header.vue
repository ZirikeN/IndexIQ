<template>
    <UHeader class="h-[100px]">
        <template #left>
            <UILogo class="w-[120px] h-10" />

            <div
                class="ml-4 transform hover:-translate-y-0.5 transition-all duration-200"
            >
                <nuxt-link
                    to="/products"
                    class="text-[22px] bg-inverted text-inverted py-3 px-4 rounded-xl font-medium"
                    >Каталог</nuxt-link
                >
            </div>
        </template>

        <UISearch />

        <template #right>
            <UNavigationMenu :items="items" />

            <UButton
                v-if="user"
                variant="ghost"
                color="error"
                @click="handleSignOut"
                :loading="isSigningOut"
            >
                <UIcon
                    name="i-heroicons-arrow-left-on-rectangle"
                    class="w-5 h-5"
                />
                <span>Выйти</span>
            </UButton>

            <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu
                :items="items"
                orientation="vertical"
                class="-mx-2.5"
            />

            <div v-if="user" class="mt-4 pt-4 border-t">
                <UButton
                    variant="ghost"
                    color="warning"
                    block
                    @click="handleSignOut"
                    :loading="isSigningOut"
                >
                    <UIcon
                        name="i-heroicons-arrow-left-on-rectangle"
                        class="w-5 h-5"
                    />
                    <span>Выйти</span>
                </UButton>
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
