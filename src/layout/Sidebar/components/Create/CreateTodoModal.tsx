import React from "react";
import { useTranslation } from "react-i18next";
import {
    Modal,
    ModalBody,
    ModalProps,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
} from "@chakra-ui/react";

import CreateTodoForm from "./Form";

type Props = Omit<ModalProps, "children">;

const CreateTodoModal: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    return (
        <Modal isCentered size={["sm", "md", "lg"]} {...props}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("sidebar.addTodo.header")}</ModalHeader>
                <ModalCloseButton />

                <ModalBody mx="auto" maxW="560px">
                    <CreateTodoForm onClose={props.onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateTodoModal;
