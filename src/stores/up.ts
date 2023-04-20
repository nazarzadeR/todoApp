import { create } from "zustand";

type State = {
    up: boolean;
};
type Action = {
    setUp: (up: boolean) => void;
};

type UpStore = State & Action;

export const useUp = create<UpStore>((set, get) => ({
    up: false,
    setUp(up) {
        set(() => ({ up }));
    },
}));
