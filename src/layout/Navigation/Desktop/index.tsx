import React from "react";
import { HStack, Heading } from "@chakra-ui/react";

import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import SettingToggle from "./SettingToggle";

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

            <HStack gap="2">
                <NavLink>
                    <ThemeToggle />
                </NavLink>

                <NavLink mobile hideRoutesPath={["/signin", "/signup"]}>
                    <SettingToggle />
                </NavLink>
            </HStack>
        </HStack>
    );
};

export default Navigation;
