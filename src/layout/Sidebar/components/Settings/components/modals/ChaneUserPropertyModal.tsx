import React from "react";

import { Modal } from "components";
import { ModalProps } from "@chakra-ui/react";
import ChangeNameForm from "../forms/ChangeNameForm";

type Props = { isName?: boolean; header: React.ReactNode } & Omit<
    ModalProps,
    "children"
>;

const ChangeUserPropertyModal: React.FC<Props> = (props) => {
    const { isName = false, ...rest } = props;

    return (
        <Modal size={["xs", "sm", "md"]} {...rest}>
            {isName ? <ChangeNameForm /> : null}
        </Modal>
    );
};

export default ChangeUserPropertyModal;
