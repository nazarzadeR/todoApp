import http from "lib/http";

export const refresh = async (token: string) => {
    let response;

    try {
        response = await http.post("/auth/refresh", { token });

        return response.data.access_token;
    } catch (e) {
        return null;
    }
};

export const user = async (token: string) => {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.get("/user");

    return response.data;
};

export const up = async () => {
    return http.get("/");
};
