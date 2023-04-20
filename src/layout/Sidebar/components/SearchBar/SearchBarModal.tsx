import React from "react";
import { useFormik } from "formik";
import {
    Modal,
    Input,
    ModalBody,
    ModalProps,
    InputGroup,
    ModalOverlay,
    ModalContent,
    InputLeftElement,
} from "@chakra-ui/react";

import { Search } from "components";

type Props = Omit<ModalProps, "children">;

const SearchBarModal: React.FC<Props> = (props) => {
    const initialRef = React.useRef(null);
    const onCloseWhenEnter = (e: any) => e.key === "Enter" && props.onClose();
    const formik = useFormik({
        initialValues: { search: "" },
        onSubmit(values, formikHelpers) {
            console.log(values);
        },
    });

    return (
        <Modal
            size={["xs", "sm"]}
            motionPreset="scale"
            initialFocusRef={initialRef}
            {...props}
        >
            <ModalOverlay />
            <ModalContent ref={initialRef}>
                <ModalBody p="0">
                    <InputGroup size="lg" w="full" h="full">
                        <InputLeftElement
                            color="gray.500"
                            pointerEvents="none"
                            children={<Search />}
                        />
                        <Input
                            name="search"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            onKeyDown={onCloseWhenEnter}
                        />
                    </InputGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SearchBarModal;
