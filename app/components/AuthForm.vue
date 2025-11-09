<template>
    <UCard class="max-w-md w-full mx-auto border border-primary">
        <template #header>
            <div class="text-center">
                <h2 class="text-2xl font-bold">
                    {{ isLogin ? "Вход в аккаунт" : "Регистрация" }}
                </h2>
                <p class="mt-2">
                    {{
                        isLogin
                            ? "Войдите в свой аккаунт"
                            : "Создайте новый аккаунт"
                    }}
                </p>
            </div>
        </template>

        <UForm
            :schema="schema"
            :state="state"
            class="space-y-4 flex flex-col items-center"
            @submit="onSubmit"
        >
            <UFormField label="Email" name="email" class="w-[300px]">
                <UInput
                    v-model="state.email"
                    type="email"
                    placeholder="your@email.com"
                    autocomplete="email"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="Пароль" name="password" class="w-[300px]">
                <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="••••••••"
                    autocomplete="current-password"
                    class="w-full"
                />
            </UFormField>

            <UButton
                type="submit"
                block
                :loading="pending"
                :disabled="pending"
                class="mt-6 w-[300px]"
            >
                {{ isLogin ? "Войти" : "Зарегистрироваться" }}
            </UButton>
        </UForm>

        <template #footer>
            <div class="text-center">
                <p class="text-gray-600">
                    {{ isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?" }}
                    <UButton
                        variant="link"
                        @click="isLogin = !isLogin"
                        class="ml-1"
                    >
                        {{ isLogin ? "Зарегистрироваться" : "Войти" }}
                    </UButton>
                </p>
            </div>
        </template>
    </UCard>
</template>

<!-- pages/auth.vue -->
<script setup>
import { object, string, pipe, email, minLength } from "valibot";

const state = reactive({
    email: "",
    password: "",
});

const isLogin = ref(true);
const pending = ref(false);
const toast = useToast();

const { signIn, signUp, user, getSession } = useAuth();

const schema = object({
    email: pipe(string("Email обязателен"), email("Неверный формат email")),
    password: pipe(
        string("Пароль обязателен"),
        minLength(8, "Пароль должен быть минимум 8 символов")
    ),
});

// Следим за изменением user и редиректим
watch(user, (newUser) => {
    if (newUser) {
        setTimeout(() => {
            navigateTo("/");
        }, 1000);
    }
});

// Обработка отправки формы
async function onSubmit() {
    if (pending.value) return;
    pending.value = true;

    try {
        let result;
        if (isLogin.value) {
            result = await signIn(state.email, state.password);
        } else {
            result = await signUp(state.email, state.password);
        }

        if (result.error) {
            throw new Error(result.error.message);
        }

        // Показываем успешное сообщение
        toast.add({
            title: isLogin.value ? "Успешный вход!" : "Регистрация успешна!",
            description: isLogin.value
                ? "Перенаправляем..."
                : "Проверьте вашу почту",
            color: "primary",
        });

        // Принудительно обновляем сессию
        await getSession();

        // Очистка формы
        state.email = "";
        state.password = "";
    } catch (error) {
        toast.add({
            title: "Ошибка",
            description: error.message,
            color: "error",
        });
    } finally {
        pending.value = false;
    }
}
</script>
