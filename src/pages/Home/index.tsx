import React from "react";
import { nanoid } from "nanoid";

import { useFilter, useFilters } from "stores";
import todoFilter from "./helpers/filter";
import useRequest from "./hook/useRequest";
import { StickyList, StickyCard } from "./components";

const Home = () => {
    const { filter } = useFilter();
    const { allOfTodoQuery } = useRequest();
    const { filter: searchFilter } = useFilters();
    const { data, isLoading } = allOfTodoQuery();

    if (isLoading) return null;

    console.log(searchFilter);

    return (
        <StickyList>
            {!!data &&
                todoFilter(filter, data)
                    .filter((todo) =>
                        !!searchFilter ? todo?.title.match(searchFilter) : true
                    )
                    .map((todo: any) => (
                        <StickyCard key={nanoid()} todo={todo} />
                    ))}
        </StickyList>
    );
};

export default Home;
