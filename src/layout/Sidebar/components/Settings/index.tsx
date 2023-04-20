import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    Box,
    Text,
    Menu,
    Portal,
    Tooltip,
    Center,
    HStack,
    MenuButton,
    useBoolean,
} from "@chakra-ui/react";

import { useEvent } from "hooks";
import MenuItems from "./components/MenuItems";
import { Setting as SettingIcon } from "components";

type Props = {
    initial: boolean;
};

const Setting: React.FC<Props> = ({ initial }) => {
    const { t } = useTranslation();
    const [sideOpen, { on, off }] = useBoolean(initial);

    useEvent("side", ({ detail: { open } }) => {
        open ? on() : off();
    });

    return (
        <Menu>
            <Tooltip
                label={!sideOpen ? t("sidebar.setting.setting") : undefined}
            >
                <MenuButton
                    as={Box}
                    w="80%"
                    cursor="pointer"
                    borderRadius="md"
                    _hover={{
                        bg: sideOpen ? "" : "bg-light",
                    }}
                >
                    <AnimatePresence>
                        <HStack gap="2">
                            <Center
                                h="50px"
                                as={motion.div}
                                animate={!sideOpen ? "max" : "min"}
                                variants={{
                                    min: {
                                        width: "max-content",
                                        transition: {
                                            delay: 1,
                                        },
                                    },
                                    max: {
                                        width: "100%",
                                    },
                                }}
                            >
                                <SettingIcon fontSize="lg" />
                            </Center>

                            {sideOpen && (
                                <Text
                                    as={motion.p}
                                    fontSize="md"
                                    fontWeight="bold"
                                    textTransform="capitalize"
                                    initial={{ opacity: 0 }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            delay: 0.2,
                                        },
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            delay: 0.3,
                                        },
                                    }}
                                >
                                    {t("sidebar.setting.setting")}
                                </Text>
                            )}
                        </HStack>
                    </AnimatePresence>
                </MenuButton>
            </Tooltip>
            <Portal>
                <MenuItems />
            </Portal>
        </Menu>
    );
};

export default Setting;
