
import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig();

    const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseAnonKey
    );

    // Тестируем подключение
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            console.error(error.message);
        } else {
            console.log(
                "Supabase connected, session:",
                data.session ? "EXISTS" : "NONE"
            );
        }
    } catch (error) {
        console.error(error);
    }

    return {
        provide: {
            supabase,
        },
    };
});
