import React from "react";
import { useQuery } from "react-query";

import { up as upService } from "services";
import { useUp as useUpStore } from "stores";

const useUp = (options: object = {}) => {
    const { setUp, up } = useUpStore();
    return useQuery("up", upService, {
        retry: 4,
        enabled: !up,
        refetchInterval: 9000,
        refetchIntervalInBackground: true,
        onError: (response) => setUp(false),
        onSuccess: (response) => setUp(!!response.data.up),
        retryDelay: (attemptIndex) => Math.min(1000 * 2 * attemptIndex, 10000),
        ...options,
    });
};

export default useUp;
