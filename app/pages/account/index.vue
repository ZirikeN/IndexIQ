<template>
    <div class="container mx-auto p-6">
        <UCard>
            <template #header>
                <h1 class="text-2xl font-bold">Профиль пользователя</h1>
            </template>

            <div v-if="user" class="space-y-4">
                <div class="p-4 bg-green-50 rounded-lg">
                    <h2 class="text-lg font-semibold text-green-800">
                        Вы успешно авторизованы!
                    </h2>
                    <p class="text-green-600">Email: {{ user.email }}</p>
                    <p class="text-green-600">ID: {{ user.id }}</p>
                </div>

                <UButton @click="checkSession" class="mr-2">
                    Проверить сессию
                </UButton>

                <UButton @click="refreshAuth" variant="outline" class="mr-2">
                    Обновить статус
                </UButton>
            </div>

            <div v-else class="p-4 bg-red-50 rounded-lg">
                <h2 class="text-lg font-semibold text-red-800">
                    Вы не авторизованы
                </h2>
                <UButton to="/auth" class="mt-2"> Войти </UButton>
            </div>
        </UCard>
    </div>
</template>

<script setup>
const { user, getSession } = useAuth();

const checkSession = async () => {
    await getSession();
    console.log("Current user:", user.value);
};

const refreshAuth = () => {
    // Принудительно обновляем страницу
    window.location.reload();
};
</script>
