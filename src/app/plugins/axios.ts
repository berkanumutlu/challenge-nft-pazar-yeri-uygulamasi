import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const axiosInstance = axios.create({
        baseURL: config.public.apiUrl as string,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return {
        provide: {
            axios: axiosInstance
        }
    }
})