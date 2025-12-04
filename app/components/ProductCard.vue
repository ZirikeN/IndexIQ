<template>
    <UCard
        class="card-hover relative p-0"
        :ui="{
            footer: 'p-0 pb-4',
        }"
    >
        <div>
            <NuxtImg
                v-if="product.images"
                :src="product.images[0]"
                :alt="product.name"
                class="w-full object-cover rounded-md cursor-pointer product-image"
                loading="lazy"
                @click="navigateTo(`/products/${product.id}`)"
            />
            <div
                v-else
                class="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center"
            >
                <UIcon
                    name="i-heroicons-photo"
                    class="w-12 h-12 text-gray-400"
                />
            </div>

            <p
                class="text-2xl font-medium text-primary cursor-pointer"
                @click="navigateTo(`/products/${product.id}`)"
            >
                {{ product.price }} ₽
            </p>
            <h3
                class="cursor-pointer"
                @click="navigateTo(`/products/${product.id}`)"
            >
                {{ product.name }}
            </h3>
            <p>{{ product.description }}</p>
        </div>

        <template #footer>
            <div class="flex gap-2">
                <UButton
                    :icon="
                        isInFavorites
                            ? 'i-heroicons-heart-20-solid'
                            : 'i-heroicons-heart'
                    "
                    :color="isInFavorites ? 'error' : 'neutral'"
                    class="flex-1 cursor-pointer"
                    variant="outline"
                    :loading="loading"
                    @click="$emit('toggle-favorite', product)"
                >
                    {{ isInFavorites ? "В избранном" : "В избранное" }}
                </UButton>

                <UButton
                    v-if="!isInCart"
                    icon="i-heroicons-shopping-cart"
                    color="primary"
                    class="flex-1 cursor-pointer text-white"
                    @click="$emit('add-to-cart', product)"
                >
                    В корзину
                </UButton>

                <UButton
                    v-else
                    icon="i-heroicons-shopping-bag"
                    color="primary"
                    class="flex-1 cursor-pointer"
                    @click="navigateTo('/cart')"
                >
                    В корзине
                </UButton>
            </div>
        </template>
    </UCard>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    isInFavorites: {
        type: Boolean,
        default: false,
    },
    isInCart: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["toggle-favorite", "add-to-cart"]);
</script>

<style scoped>
.card-hover {
    transition: all 0.2s ease-in-out;
    transform: translateY(0);
}

.card-hover .product-image {
    transition: all 0.2s ease-in-out;
}

.card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 5px var(--color-primary);
}

.card-hover:hover .product-image {
    transform: scale(1.05);
}
</style>
