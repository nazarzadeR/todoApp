import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { ModalProps, VStack } from "@chakra-ui/react";

import { Modal, InputField } from "components";
import useRequest from "pages/Home/hook/useRequest";
import SubmitButton from "layout/Sidebar/components/Create/Form/SubmitButton";

type Props = Omit<ModalProps, "children"> & {
    id: string;
};

const CreateTodoModal: React.FC<Props> = (props) => {
    const { id } = props;
    const { t } = useTranslation();
    const { addTodoForTodoList } = useRequest();

    const onSubmit = async ({ title }: any, helpers: any) => {
        await addTodoForTodoList.mutateAsync({
            id,
            title,
        });
    };

    return (
        <Modal size={["sm", "md"]} {...props}>
            <Formik initialValues={{ title: "" }} onSubmit={onSubmit}>
                {(context) => (
                    <VStack as={Form} p="2">
                        <InputField
                            id="title"
                            name="title"
                            placeholder={t("home.todo.input") as string}
                        />

                        <SubmitButton
                            w="80%"
                            m="auto"
                            type="submit"
                            isLoading={context.isSubmitting}
                        >
                            {t("home.todo.add")}
                        </SubmitButton>
                    </VStack>
                )}
            </Formik>
        </Modal>
    );
};

export default CreateTodoModal;
