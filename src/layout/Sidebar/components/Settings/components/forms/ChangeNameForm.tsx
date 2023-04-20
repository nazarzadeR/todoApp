import React from "react";
import { Formik, Form } from "formik";
import { VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useHttp } from "hooks";
import { InputField } from "components";
import useRequest from "../../hook/useRequest";
import SubmitButton from "layout/Sidebar/components/Create/Form/SubmitButton";

const ChangeNameForm = () => {
    const { t } = useTranslation();
    const { changeUserPropertyMutation } = useRequest();

    const onSubmit = async (values: any, helpers: any) => {
        const { username } = values;

        await changeUserPropertyMutation.mutateAsync(username, {
            onSettled() {},
        });
    };

    return (
        <Formik initialValues={{ username: "" }} onSubmit={onSubmit}>
            {(ctx) => (
                <Form>
                    <VStack m="2" gap="2">
                        <InputField
                            id="username"
                            name="username"
                            placeholder={
                                t("sign.username.input.hint") as string
                            }
                        />

                        <SubmitButton
                            type="submit"
                            isLoading={ctx.isSubmitting}
                        >
                            {t("sidebar.setting.userPropertyModal.change")}
                        </SubmitButton>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

export default ChangeNameForm;
