import React from "react";
import {
    Input,
    useBoolean,
    InputGroup,
    FormControl,
    InputRightElement,
    InputLeftElement,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useField, FieldHookConfig } from "formik";
import { Check, Cross, OpenEye, CloseEye } from "components";

interface Props extends React.DetailedHTMLProps<any, any> {
    left?: string | JSX.Element;
    pwd?: boolean;
    noLeft?: boolean;
}

const InputField: React.FC<Props & FieldHookConfig<any>> = ({
    left,
    pwd = false,
    noLeft = false,
    ...props
}) => {
    const [field, meta] = useField(props);
    const [show, { toggle }] = useBoolean(false);

    const onError: boolean = !!meta.touched && !!meta.error;

    return (
        <FormControl isInvalid={onError}>
            <InputGroup size="lg">
                {left && (
                    <InputLeftElement
                        fontSize="md"
                        children={left}
                        pointerEvents="none"
                        color="gray.500"
                    />
                )}
                <Input
                    variant="filled"
                    {...field}
                    {...(props as any)}
                    type={show ? "text" : props.type}
                />
                {!pwd ? (
                    meta.touched &&
                    !noLeft && (
                        <InputRightElement
                            fontSize="md"
                            pointerEvents="none"
                            color={meta.error ? "crimson" : "green.600"}
                            children={meta.error ? <Cross /> : <Check />}
                        />
                    )
                ) : (
                    <InputRightElement
                        cursor="pointer"
                        fontSize="x-large"
                        userSelect="none"
                        onClick={() => toggle()}
                        children={show ? <OpenEye /> : <CloseEye />}
                    />
                )}
            </InputGroup>

            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default InputField;
