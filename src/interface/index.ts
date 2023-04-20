export type User = {
    id: string;
    role: string;
    username: string;
};

type Tags = {
    name: string;
};

export type miniTodo = {
    id: string;
    title: string;
    completed: boolean;
};

export type Todo = {
    id: string;
    title: string;
    userId: string;
    description: string;
    color: string;
    todo: miniTodo[];
    endless: boolean;
    endOfTheTime: any;
    created_at: string;
    update_at: string;
};

export type AddTodo = Omit<
    Todo,
    "id" | "userId" | "todo" | "created_at" | "update_at" | "endless"
>;

export enum Roles {
    ADMIN = "ADMIN",
    USER = "USER",
}
