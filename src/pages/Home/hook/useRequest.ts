import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Todo } from "interface";
import { useHttp, useToast } from "hooks";

const useRequest = () => {
    const http = useHttp();
    const toast = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const todoApiRoute = () => http.post("/user");
    const deleteTodo = (id: string) => http.delete("todo/" + id);
    const addTodoToTodoList = ({ id, title }: any) =>
        http.post("todo/" + id, { title });

    const allOfTodoQuery = () =>
        useQuery("todos", todoApiRoute, {
            staleTime: Infinity,
            select: (response) => response.data.todos as Todo[],
        });

    const deleteTodoMutation = useMutation(deleteTodo, {
        onSuccess(response, id) {
            queryClient.setQueryData("todos", (oldData: any) => {
                const todos = oldData.data.todos;
                const newTodos = todos.filter((t: Todo) =>
                    id === t.id ? null : t
                );

                oldData.data.todos = newTodos;

                return oldData;
            });
        },
        onError(err) {
            toast({
                status: "error",
                description: t("error"),
            });
        },
    });

    const addTodoForTodoList = useMutation(addTodoToTodoList, {
        onSuccess(response, variable, context) {
            const { id, title } = variable;
            queryClient.setQueryData("todos", (oldData: any) => {
                const todos = oldData.data.todos;
                const newTodos = todos.map((t: Todo) => {
                    if (id === t.id) {
                        t.todo.push({
                            title,
                            id: "idk",
                            completed: false,
                        });
                    }
                    return t;
                });

                oldData.data.todos = newTodos;

                return oldData;
            });
        },
        onError(err) {
            toast({
                status: "error",
                description: t("error"),
            });
        },
    });

    return {
        allOfTodoQuery,
        deleteTodoMutation,
        addTodoForTodoList,
    };
};

export default useRequest;
