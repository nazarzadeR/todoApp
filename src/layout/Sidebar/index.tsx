import React, { useEffect } from "react";
import { useMediaQuery, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { motion, useAnimation } from "framer-motion";

import { useEvent } from "hooks";
import { Title, Tasks, SignOut, Settings, SearchBar } from "./components";

const Sidebar = () => {
    const controller = useAnimation();
    const { pathname } = useLocation();
    const only = ["", "today", "upcoming", "create"];
    const [isLessThenMd] = useMediaQuery("(max-width: 768px)");
    const [isLessThenSm] = useMediaQuery("(max-width: 480px)");
    const event = useEvent("side", ({ detail: { open } }) => {
        controller.start(open ? "maximum" : "minimum");
    });

    useEffect(() => {
        event.emit({ open: !isLessThenMd });
    }, [isLessThenMd]);

    if (!only.some((p) => `/${p}` === pathname) || isLessThenSm) return null;

    return (
        <VStack
            gap="2"
            h="98%"
            minW="220px"
            bg="bg-dark"
            marginY="auto"
            as={motion.div}
            marginLeft="5px"
            borderRadius="md"
            animate={controller}
            justifyContent="space-between"
            variants={{
                minimum: {
                    marginLeft: 0,
                    width: "60px",
                    height: "100%",
                    minWidth: "60px",
                    transition: {
                        duration: 0.6,
                        ease: "easeInOut",
                    },
                },
                maximum: {
                    height: "99%",
                    width: "240px",
                    minWidth: "240px",
                    marginLeft: "5px",
                    transition: {
                        duration: 0.6,
                        ease: "easeInOut",
                    },
                },
            }}
        >
            <VStack w="full">
                <Title initial={!isLessThenMd} />
                <SearchBar initial={!isLessThenMd} />
                <Tasks initial={!isLessThenMd} />
            </VStack>

            <VStack w="full" gap="2" pb="2">
                <Settings initial={!isLessThenMd} />
                <SignOut initial={!isLessThenMd} />
            </VStack>
        </VStack>
    );
};

export default Sidebar;
