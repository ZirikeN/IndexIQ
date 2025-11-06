<template>
    <UHeader class="h-[100px]">
        <template #left>
            <UILogo class="w-[120px] h-[40px]" />

            <div class="ml-4 transform hover:-translate-y-0.5 transition-all duration-200">
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

            <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu
                :items="items"
                orientation="vertical"
                class="-mx-2.5"
            />
        </template>
    </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { computed } from "vue";

const items = computed<NavigationMenuItem[]>(() => [
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
    {
        label: "Профиль",
        icon: "i-heroicons-user",
        to: "/account",
    },
]);
</script>
