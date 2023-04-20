import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useToast } from "hooks";
import { useAuth } from "stores";
import { signin, signup } from "../service/api";

const useRequest = () => {
    const toast = useToast();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setAuthWithTokens } = useAuth();

    const signinRequest = useMutation(signin, {
        onSuccess: async (response: any) => {
            if (response.status && response.status === 202) {
                const { access_token, refresh_token } = response.data;

                await setAuthWithTokens(access_token, refresh_token);
                navigate("/");
                toast({
                    status: "success",
                    description: t("sign.event.success"),
                });
            }
        },
        onError: (error: any) => {
            if (error.response.status === 403)
                toast({
                    status: "warning",
                    description: t("sign.event.wrong"),
                });
            else
                toast({
                    status: "error",
                    description: t("error"),
                });
        },
    });

    const signupRequest = useMutation(signup, {
        onSettled: async (response: any) => {
            if (response.status < 400) {
                const { access_token, refresh_token } = response.data;

                await setAuthWithTokens(access_token, refresh_token);

                navigate("/");

                toast({
                    status: "success",
                    description: t("sign.event.success"),
                });
            }
        },
        onError: (error: any) => {
            if (error.response.status === 403)
                toast({
                    status: "warning",
                    description: t("sign.event.taken"),
                });
            else
                toast({
                    status: "error",
                    description: t("error"),
                });
        },
    });

    return {
        signin: signinRequest,
        signup: signupRequest,
    };
};

export default useRequest;
