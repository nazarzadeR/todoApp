import React from "react";
import { nanoid } from "nanoid";

import { useFilter } from "stores";
import todoFilter from "./helpers/filter";
import useRequest from "./hook/useRequest";
import { StickyList, StickyCard } from "./components";

const Home = () => {
    const { filter } = useFilter();
    const { allOfTodoQuery } = useRequest();
    const { data, isLoading } = allOfTodoQuery();

    if (isLoading) return null;

    return (
        <StickyList>
            {!!data &&
                todoFilter(filter, data).map((todo: any) => (
                    <StickyCard key={nanoid()} todo={todo} />
                ))}
        </StickyList>
    );
};

export default Home;
