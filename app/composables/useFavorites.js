export const useFavorites = () => {
    const { $supabase } = useNuxtApp();
    const { user } = useAuth();

    const favorites = ref([]);
    const loading = ref(false);

    // Загрузка избранного
    const loadFavorites = async () => {
        if (!user.value) return;

        loading.value = true;
        try {
            const { data, error } = await $supabase
                .from("favorites")
                .select(
                    `
          id,
          created_at,
          product_id,
          products (
            id,
            name,
            price,
            description,
            images,
            is_published
          )
        `
                )
                .eq("user_id", user.value.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            // Фильтруем только опубликованные товары
            favorites.value = (data || []).filter(
                (fav) => fav.products && fav.products.is_published
            );
        } catch (error) {
            console.error("Ошибка загрузки избранного:", error);
        } finally {
            loading.value = false;
        }
    };

    // Добавление в избранное
    const addToFavorites = async (product) => {
        if (!user.value) {
            const toast = useToast();
            toast.add({
                title: "Войдите в систему",
                description:
                    "Чтобы добавить в избранное, необходимо авторизоваться",
                color: "warning",
            });
            return false;
        }

        try {
            const { data, error } = await $supabase
                .from("favorites")
                .insert({
                    user_id: user.value.id,
                    product_id: product.id,
                })
                .select()
                .single();

            if (error) {
                // Если товар уже в избранном, игнорируем ошибку
                if (error.code === "23505") {
                    await loadFavorites(); // Перезагружаем список
                    return true;
                }
                throw error;
            }

            // Перезагружаем список избранного
            await loadFavorites();

            const toast = useToast();
            toast.add({
                title: "Добавлено в избранное",
                description: product.name,
                color: "primary",
            });

            return true;
        } catch (error) {
            console.error("Ошибка добавления в избранное:", error);

            const toast = useToast();
            toast.add({
                title: "Ошибка",
                description: "Не удалось добавить в избранное",
                color: "error",
            });

            return false;
        }
    };

    // Удаление из избранного
    const removeFromFavorites = async (productId) => {
        if (!user.value) return false;

        try {
            const { error } = await $supabase
                .from("favorites")
                .delete()
                .eq("user_id", user.value.id)
                .eq("product_id", productId);

            if (error) throw error;

            // Удаляем из локального состояния
            favorites.value = favorites.value.filter(
                (fav) => fav.product_id !== productId
            );

            const toast = useToast();
            toast.add({
                title: "Удалено из избранного",
                color: "primary",
            });

            return true;
        } catch (error) {
            console.error("Ошибка удаления из избранного:", error);
            return false;
        }
    };

    // Проверка, находится ли товар в избранном
    const isInFavorites = (productId) => {
        return favorites.value.some((fav) => fav.product_id === productId);
    };

    // Переключение избранного
    const toggleFavorite = async (product) => {
        if (isInFavorites(product.id)) {
            return await removeFromFavorites(product.id);
        } else {
            return await addToFavorites(product);
        }
    };


    return {
        favorites: readonly(favorites),
        loading: readonly(loading),
        loadFavorites,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        toggleFavorite,
    };
};
