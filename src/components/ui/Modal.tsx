import React from "react";
import {
    ModalBody,
    ModalProps,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    Modal as ChakraModal,
} from "@chakra-ui/react";

type Props = ModalProps & {
    header?: React.ReactNode;
};

const Modal: React.FC<Props> = (props) => {
    const { header, children, ...rest } = props;

    return (
        <ChakraModal {...rest}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{header && header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children && children}</ModalBody>
            </ModalContent>
        </ChakraModal>
    );
};

export default Modal;
