import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Box,
    Text,
    HStack,
    Tooltip,
    Center,
    useBoolean,
    useDisclosure,
} from "@chakra-ui/react";

import { useEvent } from "hooks";
import { Search } from "components";
import SearchBarModal from "./SearchBarModal";

type Props = {
    initial: boolean;
};

const SearchBar: React.FC<Props> = ({ initial }) => {
    const { t } = useTranslation();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [sideOpen, { on, off }] = useBoolean(initial);

    useEvent("side", ({ detail: { open } }) => {
        open ? on() : off();
    });

    return (
        <Tooltip label={!sideOpen ? t("sidebar.search") : undefined}>
            <Center w="full">
                <Box
                    p="4"
                    as={motion.div}
                    cursor="pointer"
                    onClick={onOpen}
                    borderRadius="md"
                    _hover={{ bg: "bg-light" }}
                    w={sideOpen ? "80%" : "50px"}
                    h={sideOpen ? "80%" : "50px"}
                    bg={sideOpen ? "bg-light" : undefined}
                    whileHover={{
                        scale: sideOpen ? 1.08 : 1,
                    }}
                >
                    <HStack w="full" h="full">
                        <Search fontSize="xl" />

                        {sideOpen && (
                            <Text
                                as={motion.p}
                                userSelect="none"
                                justifySelf="center"
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                textTransform="capitalize"
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        delay: 0.2,
                                    },
                                }}
                            >
                                {t("sidebar.search")}
                            </Text>
                        )}
                    </HStack>
                </Box>

                {isOpen && <SearchBarModal isOpen={isOpen} onClose={onClose} />}
            </Center>
        </Tooltip>
    );
};

export default SearchBar;
