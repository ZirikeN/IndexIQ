<template>
    <UCard class="max-w-md w-full mx-auto border-1 border-primary">
        <template #header>
            <div class="text-center">
                <h2 class="text-2xl font-bold">
                    {{ isLogin ? "Вход в аккаунт" : "Регистрация" }}
                </h2>
                <p class=" mt-2">
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

<script setup lang="ts">
import { object, string, pipe, email, minLength } from "valibot";

// Типы для формы
interface AuthForm {
    email: string;
    password: string;
}

// Состояние формы
const state = reactive<AuthForm>({
    email: "",
    password: "",
});

// Режим формы (логин/регистрация)
const isLogin = ref(true);

// Состояние загрузки
const pending = ref(false);

// Toast для уведомлений
const toast = useToast();

// Схема валидации
const schema = object({
    email: pipe(string("Email обязателен"), email("Неверный формат email")),
    password: pipe(
        string("Пароль обязателен"),
        minLength(8, "Пароль должен быть минимум 8 символов")
    ),
});

// Обработка отправки формы
async function onSubmit() {
    if (pending.value) return;

    pending.value = true;

    try {
        // Здесь будет ваша логика API
        if (isLogin.value) {
            // Логика входа
            await loginUser(state);
            toast.add({
                title: "Успешный вход!",
                color: "primary",
            });
        } else {
            // Логика регистрации
            await registerUser(state);
            toast.add({
                title: "Регистрация успешна!",
                color: "primary",
            });
        }

        // Редирект или очистка формы
        state.email = "";
        state.password = "";
    } catch (error: any) {
        toast.add({
            title: "Ошибка",
            description: error.message || "Что-то пошло не так",
            color: "warning",
        });
    } finally {
        pending.value = false;
    }
}

// Заглушки для API функций (замените на реальные)
async function loginUser(credentials: AuthForm) {
    // Ваша логика входа
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login:", credentials);
}

async function registerUser(credentials: AuthForm) {
    // Ваша логика регистрации
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Register:", credentials);
}
</script>
