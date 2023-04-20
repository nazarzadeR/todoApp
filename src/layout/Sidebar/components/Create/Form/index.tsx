import React from "react";
import dayjs from "dayjs";
import { useBoolean, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Form as FormikForm, Formik, FormikProps, FormikHelpers } from "formik";

import { AddTodo } from "interface";
import SlideInput from "./SlideInput";
import ColorPicker from "./ColorPicker";
import { InputField } from "components";
import SubmitButton from "./SubmitButton";
import addTodoSchema from "layout/Sidebar/schema/todo";
import useRequest from "layout/Sidebar/hook/useRequest";

type Props = Partial<FormikProps<AddTodo>> & {
    onClose: any;
};

const Form: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const createTodo = useRequest();
    const [endless, { on, off }] = useBoolean(false);
    const onSubmit = async (
        values: AddTodo,
        helpers: FormikHelpers<AddTodo>
    ) => {
        if (endless) values.endOfTheTime = null;

        const data = { endless, ...values };
        await createTodo.mutateAsync(data, {
            onSettled: () => {
                props.onClose();
            },
        });
    };

    return (
        <Formik
            {...props}
            onSubmit={onSubmit}
            validationSchema={addTodoSchema(t)}
            initialValues={{
                title: "",
                color: "",
                description: "",
                endOfTheTime: dayjs().format("YYYY-MM-DD"),
            }}
        >
            {(context) => (
                <VStack
                    mb="2"
                    gap="2"
                    w="100%"
                    minW="300px"
                    maxW="560px"
                    as={FormikForm}
                >
                    <InputField
                        id="title"
                        name="title"
                        placeholder={t("sidebar.addTodo.title.input") as string}
                    />
                    <InputField
                        id="description"
                        name="description"
                        placeholder={
                            t("sidebar.addTodo.description.input") as string
                        }
                    />

                    <ColorPicker />

                    <SlideInput
                        type="date"
                        variant="filled"
                        id="endOfTheTime"
                        name="endOfTheTime"
                        onToggle={(e) => (e ? on() : off())}
                        onChange={(e) =>
                            context.setFieldValue(
                                "endOfTheTime",
                                dayjs(e.target.value).format("DD-MM-YYYY")
                            )
                        }
                    />

                    <SubmitButton
                        w="80%"
                        m="auto"
                        type="submit"
                        isLoading={context.isSubmitting}
                    >
                        {t("sidebar.create")}
                    </SubmitButton>
                </VStack>
            )}
        </Formik>
    );
};

export default Form;
