import React from "react";
import { useTranslation } from "react-i18next";
import { VStack, useBoolean } from "@chakra-ui/react";

import Create from "../Create";
import { useEvent } from "hooks";
import TaskLink from "./TaskLink";
import TaskTitle from "./TaskTitle";
import { Next, List, Sticky } from "components";
import { useNavigate } from "react-router";

type Props = {
    initial: boolean;
};

const Tasks: React.FC<Props> = ({ initial }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [sideOpen, { on, off }] = useBoolean(initial);

    useEvent("side", ({ detail: { open } }) => {
        open ? on() : off();
    });

    return (
        <VStack w="full" gap="2">
            <TaskTitle sideOpen={sideOpen} />

            <TaskLink
                Icon={Next}
                to="UPCOMING"
                label={t("sidebar.upcoming")}
                sideOpen={sideOpen}
            >
                {t("sidebar.upcoming")}
            </TaskLink>

            <TaskLink
                to="TODAY"
                Icon={List}
                label={t("sidebar.today")}
                sideOpen={sideOpen}
            >
                {t("sidebar.today")}
            </TaskLink>

            <TaskLink
                to="ALL"
                Icon={Sticky}
                label={t("sidebar.sticky")}
                sideOpen={sideOpen}
            >
                {t("sidebar.sticky")}
            </TaskLink>

            <Create sideOpen={sideOpen} />
        </VStack>
    );
};

export default Tasks;
