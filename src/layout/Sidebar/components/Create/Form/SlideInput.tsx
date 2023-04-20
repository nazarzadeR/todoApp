import React from "react";
import { useField } from "formik";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Text,
    Input,
    Button,
    HStack,
    InputGroup,
    InputProps,
    useBoolean,
    FormControl,
    InputLeftElement,
    FormErrorMessage,
} from "@chakra-ui/react";

import { Cancel, Time } from "components";

type Props = InputProps & {
    onToggle: (e: boolean) => void;
};

const SlideInput: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const { onToggle, ...rest } = props;
    const [show, { toggle }] = useBoolean(true);
    const [field, meta, helpers] = useField(props as any);

    const handleToggleShow = () => {
        toggle();
        helpers.setValue("");
        props.onToggle(show);
    };

    const onError: boolean = !!meta.touched && !!meta.error;

    return (
        <HStack w="full" gap="1">
            <FormControl
                as={motion.div}
                isInvalid={onError}
                initial="initial"
                animate={show ? "show" : "hidden"}
                variants={{
                    initial: {
                        width: 0,
                        opacity: 0,
                    },
                    hidden: {
                        width: 0,
                        opacity: 0,
                        transition: {
                            duration: 0.6,
                        },
                        transitionEnd: {
                            display: "none",
                        },
                    },
                    show: {
                        opacity: 1,
                        width: "80%",
                        display: "initial",
                        transition: {
                            duration: 0.6,
                        },
                    },
                }}
            >
                <InputGroup size="lg">
                    <InputLeftElement
                        fontSize="md"
                        children={<Time />}
                        pointerEvents="none"
                        color="gray.500"
                    />

                    <Input type="date" {...rest} {...field} />
                </InputGroup>

                <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>

            <Button
                size="lg"
                initial="initial"
                ml="0 !important"
                as={motion.button}
                onClick={handleToggleShow}
                animate={show ? "show" : "hidden"}
                colorScheme={show ? "red" : "green"}
                variants={{
                    initial: {
                        width: "100%",
                    },
                    show: {
                        width: "20%",
                        transition: {
                            duration: 0.6,
                        },
                    },
                    hidden: {
                        width: "100%",
                        transition: {
                            duration: 0.6,
                        },
                    },
                }}
            >
                {!show ? (
                    <Text
                        as={motion.p}
                        initial={{ opacity: 0, display: "none" }}
                        animate={{
                            opacity: 1,
                            display: "initial",
                            transition: {
                                delay: 0.6,
                                duration: 0.2,
                            },
                        }}
                    >
                        {t("sidebar.addTodo.endOfTime.question") as any}
                    </Text>
                ) : (
                    <Cancel color="white" fontSize="2xl" />
                )}
            </Button>
        </HStack>
    );
};

export default SlideInput;
