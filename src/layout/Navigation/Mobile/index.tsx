import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, HStack, useDisclosure, useMediaQuery } from "@chakra-ui/react";

import NavLink from "./NavLink";
import { useFilter } from "stores";
import Indicator from "./Indicator";
import { ElementContextProvider } from "./elementContext";
import { Next, Search, Sticky, List, AddTodo } from "components";
import SearchBarModal from "layout/Sidebar/components/SearchBar/SearchBarModal";
import CreateTodoModal from "layout/Sidebar/components/Create/CreateTodoModal";
import { useLocation } from "react-router";

const MobileNavigation = () => {
    const { t } = useTranslation();
    const { setFilter } = useFilter();
    const { pathname } = useLocation();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isLessThenSm] = useMediaQuery("(max-width: 480px)");
    const showAbleRoutes = ["/"];
    const {
        isOpen: isOpenTodo,
        onClose: onCLoseTodo,
        onOpen: onOpenTodo,
    } = useDisclosure();

    if (!isLessThenSm || !showAbleRoutes.some((val) => pathname === val))
        return null;

    return (
        <Flex
            w="full"
            h="60px"
            bottom="0"
            maxW="480px"
            bg="bg-dark"
            position="fixed"
            m="0 !important"
            alignItems="center"
            justifyContent="center"
        >
            <ElementContextProvider>
                <NavLink
                    Icon={<List fontSize="xl" />}
                    indicator={"TODAY"}
                    onDo={() => {
                        setFilter("TODAY");
                    }}
                >
                    {t("sidebar.today")}
                </NavLink>
                <NavLink
                    Icon={<Next fontSize="xl" />}
                    indicator={"UPCOMING"}
                    onDo={() => {
                        setFilter("UPCOMING");
                    }}
                >
                    {t("sidebar.upcoming")}
                </NavLink>
                <NavLink
                    indicator={"ALL"}
                    Icon={<Sticky fontSize="xl" />}
                    onDo={() => {
                        setFilter("ALL");
                    }}
                >
                    {t("sidebar.sticky")}
                </NavLink>
                <NavLink Icon={<Search fontSize="xl" />} onDo={() => onOpen()}>
                    {t("sidebar.search")}
                    <SearchBarModal onClose={onClose} isOpen={isOpen} />
                </NavLink>
                <NavLink
                    Icon={<AddTodo fontSize="xl" />}
                    onDo={() => onOpenTodo()}
                >
                    {t("sidebar.setting.setting")}
                    <CreateTodoModal
                        onClose={onCLoseTodo}
                        isOpen={isOpenTodo}
                    />
                </NavLink>

                <Indicator />
            </ElementContextProvider>
        </Flex>
    );
};

export default MobileNavigation;
