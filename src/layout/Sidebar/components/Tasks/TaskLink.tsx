import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Text, Tooltip, BoxProps, HStack, Center } from "@chakra-ui/react";

import { useFilter, Filter } from "stores";

type Props = BoxProps & {
    Icon: any;
    to?: Filter;
    label: string;
    sideOpen: boolean;
};

const TaskLink: React.FC<Props> = (props) => {
    const { setFilter, filter } = useFilter();
    const { Icon, sideOpen, children, label, to, ...rest } = props;

    const active = to === filter;

    return (
        <Tooltip label={!sideOpen ? label : undefined}>
            <HStack
                p="6"
                gap="2"
                w="80%"
                cursor="pointer"
                borderRadius="md"
                bgColor={active ? "bg-light" : ""}
                h={sideOpen ? "30px" : "50px"}
                onClick={() => setFilter(to || "ALL")}
                {...rest}
            >
                <AnimatePresence>
                    <>
                        <Center
                            h="full"
                            as={motion.div}
                            borderRadius="md"
                            _hover={{
                                bg: sideOpen ? "" : "bg-light",
                            }}
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
                            <Icon fontSize="lg" />
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
                                {children && children}
                            </Text>
                        )}
                    </>
                </AnimatePresence>
            </HStack>
        </Tooltip>
    );
};

export default TaskLink;
