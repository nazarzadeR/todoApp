import React from "react";
import { useFormikContext, FormikContextType } from "formik";
import { Button, ButtonProps } from "@chakra-ui/react";

import { AddTodo } from "interface";

type Props = ButtonProps & Partial<FormikContextType<AddTodo>>;

const SubmitButton: React.FC<Props> = (props) => {
    const { children } = props;
    const { isValid } = useFormikContext();

    return (
        <Button colorScheme="green" {...props} disabled={!isValid}>
            {children}
        </Button>
    );
};

export default SubmitButton;
