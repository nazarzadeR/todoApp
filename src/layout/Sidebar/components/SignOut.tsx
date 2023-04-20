import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    Text,
    Center,
    useBoolean,
    useColorModeValue,
    Tooltip,
} from "@chakra-ui/react";

import { useAuth } from "stores";
import { useEvent } from "hooks";
import { SignOut as SignOutIcon } from "components";

type Props = {
    initial: boolean;
};

const SignOut: React.FC<Props> = ({ initial }) => {
    const { signOut } = useAuth();
    const { t } = useTranslation();
    const [sideOpen, { on, off }] = useBoolean(initial);
    const bgColor = useColorModeValue("yellow.400", "yellow.500");
    const bgColorDarken = useColorModeValue("yellow.500", "yellow.600");

    useEvent("side", ({ detail: { open } }) => {
        open ? on() : off();
    });

    return (
        <Tooltip label={!sideOpen ? t("sidebar.signOut") : undefined}>
            <Center
                w="90%"
                h="50px"
                fontSize="lg"
                cursor="pointer"
                borderRadius="md"
                fontWeight="bolder"
                bgColor={bgColor}
                onClick={signOut}
                _hover={{ bg: bgColorDarken }}
            >
                <AnimatePresence initial>
                    {sideOpen ? (
                        <Text
                            as={motion.p}
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                    duration: 0.6,
                                },
                            }}
                        >
                            {t("sidebar.signOut")}
                        </Text>
                    ) : (
                        <Center
                            w="full"
                            h="full"
                            as={motion.div}
                            exit={{
                                opacity: 0,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                    duration: 0.6,
                                },
                            }}
                        >
                            <SignOutIcon />
                        </Center>
                    )}
                </AnimatePresence>
            </Center>
        </Tooltip>
    );
};

export default SignOut;
