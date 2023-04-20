import http from "lib/http";
import { useEffect } from "react";
import { useAuth, useToken } from "stores";
import { InternalAxiosRequestConfig } from "axios";
import { refresh } from "services";

const useHttp = () => {
    const { access_token } = useAuth();
    const { token, getToken } = useToken();

    useEffect(() => {
        const passTokenToRequestInterceptor = http.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                if (!!!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${access_token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const handleUnauthorizedResponsesInterceptor =
            http.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const prevRequest = error?.config;

                    if (
                        error.response.status === 401 &&
                        !prevRequest?.sent &&
                        !!token
                    ) {
                        prevRequest.sent = true;

                        const new_access_token = await refresh(getToken());

                        prevRequest.headers.Authorization = `Bearer ${new_access_token}`;
                    }
                }
            );

        return () => {
            http.interceptors.request.eject(passTokenToRequestInterceptor);
            http.interceptors.response.eject(
                handleUnauthorizedResponsesInterceptor
            );
        };
    }, []);

    return http;
};

export default useHttp;
