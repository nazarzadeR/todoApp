import React, { PropsWithChildren } from "react";

import { Stack } from "@chakra-ui/react";

const StickyList: React.FC<PropsWithChildren> = ({ children }) => (
    <Stack
        my="8"
        gap="4"
        w="full"
        flexWrap="wrap"
        overflow="scroll"
        direction={["column", "row"]}
        alignContent={["flex-start"]}
        justifyContent={["flex-start", "flex-start", "center"]}
        sx={{
            "& > *": {
                ml: "0 !important",
            },
        }}
    >
        {children}
    </Stack>
);

export default StickyList;
