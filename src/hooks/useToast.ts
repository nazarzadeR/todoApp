import React from "react";
import { useToast as useChakraToast, ToastProps } from "@chakra-ui/react";

type Props = {
    title?: string;
    description: string;
} & ToastProps;

const useToast = () => {
    const t = useChakraToast();

    const toast = (use: Props, params: ToastProps = {}) =>
        t({
            ...use,
            duration: 3000,
            position: "top",
            isClosable: true,
            ...params,
        });

    return toast;
};

export default useToast;
