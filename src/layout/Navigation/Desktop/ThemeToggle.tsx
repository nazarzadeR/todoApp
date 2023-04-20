import React from "react";

import { Center, useColorMode } from "@chakra-ui/react";

import { Sun, Moon } from "components";

const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    return (
        <Center cursor="pointer" onClick={toggleColorMode}>
            {isDark ? <Sun /> : <Moon />}
        </Center>
    );
};

export default ThemeToggle;
