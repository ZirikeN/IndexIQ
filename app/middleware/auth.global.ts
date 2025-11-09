export default defineNuxtRouteMiddleware((to) => {
    const { user } = useAuth();

    // Если пользователь не авторизован и пытается зайти на защищенные страницы
    if (!user.value && to.meta.auth) {
        return navigateTo("/auth");
    }

    // Если пользователь авторизован и пытается зайти на auth страницу
    if (user.value && to.path === "/auth") {
        return navigateTo("/profile");
    }
});
