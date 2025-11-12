export default defineNuxtRouteMiddleware((to, from) => {
    const { $supabase } = useNuxtApp();
    const user = useAuth().user;

    // Проверяем доступ к страницам оформления заказа
    if (
        to.path.startsWith("/checkout") ||
        to.path.startsWith("/order-confirmation")
    ) {
        if (!user.value) {
            // Показываем уведомление
            const toast = useToast();
            toast.add({
                title: "Требуется авторизация",
                description: "Войдите в систему для оформления заказа",
                color: "warning",
            });

            // Перенаправляем на страницу авторизации
            return navigateTo("/auth?redirect=" + to.path);
        }
    }
});
