import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Center,
    Text,
    HStack,
    useBoolean,
    useMediaQuery,
} from "@chakra-ui/react";

import { useEvent } from "hooks";
import { useAuth } from "stores";
import { MenuClose, MenuOpen } from "components";

type Props = {
    initial: boolean;
};

const Title: React.FC<Props> = ({ initial }) => {
    const {
        user: { username },
    } = useAuth();
    const [isOpen, { on, off }] = useBoolean(initial);
    const [isLessThenSm] = useMediaQuery("(max-width: 600px)");
    const event = useEvent("side", ({ detail: { open } }) => {
        open ? on() : off();
    });

    const toggleSide = () => {
        if (isLessThenSm) {
            event.emit({ open: false });
            return null;
        }

        event.emit({ open: !isOpen });
    };

    return (
        <HStack h="50px" w="full" mt="2">
            <Center
                w="50px"
                h="full"
                ml="5px"
                borderRadius="md"
                cursor="pointer"
                onClick={toggleSide}
                _hover={{ bg: "bg-light" }}
            >
                {isOpen ? (
                    <MenuClose fontSize="xl" />
                ) : (
                    <MenuOpen fontSize="xl" />
                )}
            </Center>
            <Center>
                <AnimatePresence initial>
                    {isOpen && (
                        <Text
                            as={motion.p}
                            w="full"
                            size="lg"
                            transition=".6s"
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                },
                            }}
                        >
                            {username}
                        </Text>
                    )}
                </AnimatePresence>
            </Center>
        </HStack>
    );
};

export default Title;
