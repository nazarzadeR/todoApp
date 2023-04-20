import React from "react";
import { useMutation } from "react-query";

import { useHttp } from "hooks";
import { useAuth } from "stores";

const useRequest = () => {
    const http = useHttp();
    const { changeName, signOut } = useAuth();
    const deleteUser = () => http.delete("user");
    const changeUserPropertyMethod = (username: string) =>
        http.patch("user", { username });

    const deleteUserMutation = useMutation(deleteUser, {
        onSuccess: () => {
            signOut();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const changeUserPropertyMutation = useMutation(changeUserPropertyMethod, {
        onSuccess: async (response, username, ctx) => {
            await changeName(username);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return { changeUserPropertyMutation, deleteUserMutation };
};

export default useRequest;
