<template>
    <div class="search-container">
        <UInput
            class="flex mb-3"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Найдите смартфоны, ноутбуки, аксессуары..."
        >
        </UInput>

        <!-- Декоративные подсказки -->
        <div class="suggestions flex flex-wrap gap-2">
            <UBadge
                v-for="suggestion in popularSuggestions"
                :key="suggestion"
                variant="soft"
                color="neutral"
                class="cursor-pointer hover:shadow-[0_0_0_2px_var(--color-primary)] transition-colors"
            >
                {{ suggestion }}
            </UBadge>
        </div>
    </div>
</template>

<script setup lang="ts">
const popularSuggestions = [
    "iPhone 15",
    "MacBook Air",
    "AirPods",
    "Apple Watch",
    "iPad",
    "PlayStation 5",
];
</script>

<style scoped>
.search-container {
    width: 100%;
}
</style>
