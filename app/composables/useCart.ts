// Сначала определим типы
interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    images?: string[];
    specifications?: Record<string, any>;
    package_contents?: string[];
}

interface CartItem {
    product: Product;
    quantity: number;
    addedAt: string;
}

export const useCart = () => {
    const cart = ref<CartItem[]>([]);
    const loading = ref(false);

    // Загрузка корзины из localStorage
    const loadCart = () => {
        if (process.client) {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                try {
                    cart.value = JSON.parse(savedCart);
                } catch (e) {
                    console.error("Ошибка загрузки корзины:", e);
                    cart.value = [];
                }
            }
        }
    };

    // Сохранение корзины в localStorage
    const saveCart = () => {
        if (process.client) {
            localStorage.setItem("cart", JSON.stringify(cart.value));
        }
    };

    // Добавление товара в корзину
    const addToCart = (product: Product, quantity: number = 1) => {
        const existingItem = cart.value.find(
            (item) => item.product.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.value.push({
                product,
                quantity,
                addedAt: new Date().toISOString(),
            });
        }

        saveCart();
    };

    // Удаление товара из корзины
    const removeFromCart = (productId: string) => {
        cart.value = cart.value.filter((item) => item.product.id !== productId);
        saveCart();
    };

    // Изменение количества товара
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const item = cart.value.find((item) => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
            saveCart();
        }
    };

    // Очистка корзины
    const clearCart = () => {
        cart.value = [];
        saveCart();
    };

    // Общая стоимость
    const totalPrice = computed(() => {
        return cart.value.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    });

    // Общее количество товаров
    const totalItems = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity, 0);
    });

    // Загружаем корзину при инициализации
    if (process.client) {
        loadCart();
    }

    const isInCart = (productId: string) => {
        return cart.value.some((item) => item.product.id === productId);
    };

    return {
        cart,
        loading: readonly(loading),
        totalPrice,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
    };
};
