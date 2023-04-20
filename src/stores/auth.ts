import { create } from "zustand";
import { Rabbit, enc } from "crypto-js";
import { persist } from "zustand/middleware";

import { User } from "interface";
import { Roles } from "interface";
import { refresh, user } from "services";

//  Token Store
type TokenState = {
    token: string | undefined;
};
type TokenAction = {
    getToken: () => string;
    setToken: (token?: string) => void;
};

type TokenStore = TokenState & TokenAction;

export const useToken = create(
    persist<TokenStore>(
        (set, get) => ({
            token: undefined,
            setToken: (token) => {
                if (!!!token) {
                    set(() => ({ token }));
                    return;
                }

                const hash = Rabbit.encrypt(token, "nem ee").toString();

                set(() => ({ token: hash }));
            },

            getToken: () => {
                const { token } = get();

                if (!!!token) {
                    return "";
                }

                return Rabbit.decrypt(token, "nem ee").toString(enc.Utf8);
            },
        }),
        {
            name: "token",
        }
    )
);

// Auth Store
type AuthState = {
    user: User;
    checked: boolean;
    access_token: string;
};

type AuthAction = {
    signOut: () => void;
    resetAuth: () => void;
    persistUser: () => void;
    only: (roles: Roles[]) => boolean;
    changeName: (username: string) => void;
    setAuth: (user: User, access_token: string) => void;
    setAuthWithTokens: (
        access_token: string,
        refresh_token: string
    ) => Promise<void>;
};

type AuthStore = AuthState & AuthAction;

const defaultAuthState: AuthState = {
    user: {
        id: "",
        role: "",
        username: "",
    },
    access_token: "",
    checked: false,
};

export const useAuth = create<AuthStore>((set, get) => ({
    ...defaultAuthState,
    signOut: () => {
        const { resetAuth } = get();
        const { setToken } = useToken.getState();

        resetAuth();
        setToken("");
    },
    resetAuth() {
        set(() => ({ ...defaultAuthState }));
    },
    setAuth: (user, access_token) => {
        set(() => ({ user, access_token }));
    },
    setAuthWithTokens: async (access_token, refresh_token) => {
        const { setAuth } = get();
        const { setToken } = useToken.getState();
        const userMeta: User = await user(access_token);

        setToken(refresh_token);
        setAuth(userMeta, access_token);
    },
    only: (roles) => {
        const {
            user: { role },
        } = get();
        return roles.some((r) => r === role);
    },
    persistUser: async () => {
        const { setAuth } = get();
        const { getToken } = useToken.getState();

        const token = getToken();

        const access_token = await refresh(token);

        if (!!!access_token) {
            return set(() => ({ checked: true }));
        }

        const userMeta: User = await user(access_token);

        setAuth(userMeta, access_token);
    },
    async changeName(username: string) {
        const { setToken } = useToken.getState();

        set(({ user }) => ({ user: { ...user, username } }));

        setToken();
    },
}));
