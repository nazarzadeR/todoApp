import React from "react";
import { useTranslation } from "react-i18next";
import { Link as NavLink } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import { VStack, Heading, AbsoluteCenter, Link, Box } from "@chakra-ui/react";

import { ISign } from "./interface";
import { SignButton } from "./components";
import useRequest from "./hook/useRequest";
import { InputField, User, Lock } from "components";
import { signinSchema } from "./schema/validation";

const SigninPage = () => {
    const { t } = useTranslation();
    const { signin } = useRequest();

    const onSubmit = async (values: ISign, helpers: FormikHelpers<ISign>) => {
        const { resetForm, setSubmitting } = helpers;

        await signin.mutateAsync(values, {
            onSettled: (response) => {
                resetForm();
                setSubmitting(false);
            },
        });
    };

    return (
        <AbsoluteCenter>
            <VStack w="310px" gap="3">
                <Heading size="lg">{t("sign.greeting")}</Heading>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={{ username: "", password: "" }}
                    validationSchema={signinSchema(
                        t("sign.username.input.error.required"),
                        {
                            msg: t("sign.password.input.error.required"),
                            match: t("sign.password.input.error.require"),
                        }
                    )}
                >
                    {(context) => (
                        <Form>
                            <VStack gap="2">
                                <InputField
                                    noLeft
                                    left={<User />}
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder={
                                        t("sign.username.input.hint") as string
                                    }
                                />

                                <InputField
                                    pwd
                                    noLeft
                                    id="password"
                                    left={<Lock />}
                                    name="password"
                                    type="password"
                                    placeholder={
                                        t("sign.password.input.hint") as string
                                    }
                                />

                                <Box w="full">
                                    <Link
                                        as={NavLink}
                                        to={"/signup"}
                                        color="teal.400"
                                        _hover={{}}
                                    >
                                        {t("sign.toSignup")}
                                    </Link>
                                </Box>

                                <SignButton
                                    w="70%"
                                    // type="submit"
                                    fontSize="lg"
                                    isLoading={context.isSubmitting}
                                >
                                    {t("sign.signin")}
                                </SignButton>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </VStack>
        </AbsoluteCenter>
    );
};

export default SigninPage;
