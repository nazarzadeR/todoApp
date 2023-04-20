import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";

import { AddTodo } from "interface";
import { useHttp, useToast } from "hooks";

type Todo = AddTodo & {
    endless: boolean;
};

const useRequest = () => {
    const http = useHttp();
    const toast = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const addTodoPost = (todo: Todo) => http.post("todo", todo);

    return useMutation(addTodoPost, {
        onSuccess: (response, newTodo, context) => {
            if (response.status === 201) {
                queryClient.invalidateQueries("todos");

                toast({
                    status: "success",
                    description: t("sidebar.addTodo.created"),
                });
            } else
                toast({
                    status: "error",
                    description: t("error"),
                });
        },
        onError: (e) => {
            toast({
                status: "error",
                description: t("error"),
            });
        },
    });
};

export default useRequest;
