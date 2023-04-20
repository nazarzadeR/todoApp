import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";

interface ContextProps {
    element?: HTMLElement;
    setElement?: React.Dispatch<React.SetStateAction<HTMLElement | undefined>>;
}

export const defaultValue: ContextProps = {
    element: undefined,
    setElement: undefined,
};

export const ElementContext = React.createContext<ContextProps>(defaultValue);

export const ElementContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
    ...props
}) => {
    const [element, setElement] = useState<HTMLElement | undefined>(undefined);

    return (
        <ElementContext.Provider value={{ element, setElement }}>
            <HStack
                w="full"
                h="60px"
                {...props}
                position="relative"
                alignItems="center"
                justifyContent="center"
            >
                {children}
            </HStack>
        </ElementContext.Provider>
    );
};
