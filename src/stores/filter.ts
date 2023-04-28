import { create } from "zustand";


type State = {
    filter: string;
};
type Action = {
    setFilter: (filter: string) => void;
};

type RouteStore = State & Action;

export const useFilters = create<RouteStore>((set, get) => ({
    filter: "",
    setFilter: (filter) => {
        set(() => ({ filter }));
    },
}));
