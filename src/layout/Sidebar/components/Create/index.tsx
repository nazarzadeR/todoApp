import React from "react";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "@chakra-ui/react";

import { AddTodo } from "components";
import TaskLink from "../Tasks/TaskLink";
import CreateTodoModal from "./CreateTodoModal";

type Props = {
    sideOpen: boolean;
};

const Create: React.FC<Props> = (props) => {
    const { sideOpen } = props;
    const { t } = useTranslation();
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            <TaskLink
                Icon={AddTodo}
                sideOpen={sideOpen}
                label={t("sidebar.create")}
                onClick={() => onOpen()}
            >
                {t("sidebar.create")}
            </TaskLink>

            {isOpen && <CreateTodoModal onClose={onClose} isOpen={isOpen} />}
        </>
    );
};

export default Create;
