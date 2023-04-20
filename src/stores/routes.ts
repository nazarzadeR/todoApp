import { create } from "zustand";

export type Filter = "ALL" | "UPCOMING" | "TODAY";

type State = {
    filter: Filter;
};
type Action = {
    setFilter: (filter: Filter) => void;
};

type RouteStore = State & Action;

export const useFilter = create<RouteStore>((set, get) => ({
    filter: "ALL",
    setFilter: (filter) => {
        set(() => ({ filter }));
    },
}));
