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
import { useFilters } from "stores";

type Props = Omit<ModalProps, "children">;

const SearchBarModal: React.FC<Props> = (props) => {
    const initialRef = React.useRef(null);
    const { setFilter, filter } = useFilters();

    const formik = useFormik({
        initialValues: { search: filter },
        onSubmit(values, formikHelpers) {
            setFilter(values.search);
        },
    });

    const onCloseWhenEnter = (e: any) => {
        if (e.key === "Enter") onCloseSearchBar();

        formik.submitForm();
    };

    function onCloseSearchBar() {
        formik.submitForm();
        props.onClose();
    }

    return (
        <Modal
            size={["xs", "sm", "md"]}
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
                            onKeyDown={onCloseWhenEnter}
                            onChange={formik.handleChange}
                            value={formik.values.search}
                        />
                    </InputGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SearchBarModal;
