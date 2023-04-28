import React from "react";
import { Box, Center, Menu, Portal, MenuButton } from "@chakra-ui/react";

import { Setting } from "components";
import MenuItems from "layout/Sidebar/components/Settings/components/MenuItems";

const SettingToggle = () => {
    return (
        <Menu>
            <MenuButton
                as={Box}
                w="80%"
                cursor="pointer"
                borderRadius="md"
                // _hover={{
                //     bg: sideOpen ? "" : "bg-light",
                // }}
            >
                <Center h="50px">
                    <Setting fontSize="lg" />
                </Center>
            </MenuButton>

            <Portal>
                <MenuItems hasLogout />
            </Portal>
        </Menu>
    );
};

export default SettingToggle;
