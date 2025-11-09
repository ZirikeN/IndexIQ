export const useAuth = () => {
    const { $supabase } = useNuxtApp();

    // Используем useState для глобального состояния
    const user = useState("auth-user", () => null);
    const isLoading = useState("auth-loading", () => true);

    // Функция входа
    const signIn = async (email, password) => {
        try {
            const { data, error } = await $supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { data: null, error };
            }

            user.value = data.user;
            return { data, error: null };
        } catch (error) {
            console.error("Sign in exception:", error);
            return { data: null, error };
        }
    };

    // Функция регистрации
    const signUp = async (email, password) => {
        try {
            const { data, error } = await $supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                return { data: null, error };
            }

            user.value = data.user;
            return { data, error: null };
        } catch (error) {
            console.error("Sign up exception:", error);
            return { data: null, error };
        }
    };

    // Функция выхода
    const signOut = async () => {
        try {
            const { error } = await $supabase.auth.signOut();
            if (error) throw error;
            user.value = null;
            await navigateTo("/");
        } catch (error) {
            throw error;
        }
    };

    // Получаем текущую сессию
    const getSession = async () => {
        try {
            const {
                data: { session },
                error,
            } = await $supabase.auth.getSession();

            if (error) {
                throw error;
            }

            user.value = session?.user || null;
        } catch (error) {
            console.error("❌ Get session error:", error);
            user.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    // Слушаем изменения авторизации
    $supabase.auth.onAuthStateChange((event, session) => {
        user.value = session?.user || null;
    });

    // Инициализируем при создании
    getSession();

    return {
        user: readonly(user),
        isLoading: readonly(isLoading),
        signIn,
        signUp,
        signOut,
        getSession,
    };
};
