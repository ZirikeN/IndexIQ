<template>
    <div class="search-container">
        <UInput
            class="flex"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Найдите смартфоны, ноутбуки, аксессуары..."
        >
        </UInput>

        <!-- Декоративные подсказки -->
        <div class="suggestions mt-3 flex flex-wrap gap-2">
            <UBadge
                v-for="suggestion in popularSuggestions"
                :key="suggestion"
                variant="soft"
                color="gray"
                class="cursor-pointer hover:bg-gray-200 transition-colors"
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
