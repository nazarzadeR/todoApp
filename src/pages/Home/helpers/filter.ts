import dayjs from "dayjs";

import { Todo } from "interface";

type Filters = "ALL" | "UPCOMING" | "TODAY";

export default (filter: Filters, todos: Todo[]): (Todo | null)[] =>
    todos
        .map((todo) => {
            if (filter === "ALL") return todo;

            if (filter === "TODAY") {
                if (todo.endless) return todo;

                if (dayjs(todo.endOfTheTime).isSame(dayjs(), "day"))
                    return todo;
            }

            if (filter === "UPCOMING") {
                if (todo.endless) return todo;

                if (dayjs(todo.endOfTheTime).add(1, "days").isAfter(dayjs()))
                    return todo;
            }

            return null;
        })
        .filter((t) => !!t)
        .reverse();
