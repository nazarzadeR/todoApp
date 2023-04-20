import { useEffect } from "react";

import Emitter from "lib/event";

type ReturnType = {
    Emitter: Emitter;
    emit: (data?: any) => void;
};

const useEvent = (
    name: string,
    callback?: (event: CustomEvent) => void
): ReturnType => {
    const emit = (data: any = {}) => Emitter.emit(name, data);

    useEffect(() => {
        if (callback) Emitter.on(name, callback);

        return () => {
            if (callback) Emitter.off(name, callback);
        };
    }, [name, callback]);

    return {
        emit,
        Emitter,
    };
};

export default useEvent;
