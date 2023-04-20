import React from "react";
import { HStack, Heading } from "@chakra-ui/react";

import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
    return (
        <HStack
            px="2"
            py="4"
            as="nav"
            maxH="80px"
            justifyContent="space-between"
        >
            <Heading fontWeight="semibold" size="lg">
                Todos
            </Heading>

            <HStack>
                <NavLink>
                    <ThemeToggle />
                </NavLink>
            </HStack>
        </HStack>
    );
};

export default Navigation;
