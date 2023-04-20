import React from "react";
import { useTranslation } from "react-i18next";
import { Link as NavLink } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import { VStack, Heading, AbsoluteCenter, Link, Box } from "@chakra-ui/react";

import { ISign } from "./interface";
import { SignButton } from "./components";
import useRequest from "./hook/useRequest";
import { InputField, User, Lock } from "components";
import { signupSchema } from "./schema/validation";

type SignUp = ISign & { confirm: string };

const SignupPage = () => {
    const { t } = useTranslation();
    const { signup } = useRequest();

    const onSubmit = async (values: SignUp, helpers: FormikHelpers<SignUp>) => {
        const { resetForm, setSubmitting } = helpers;

        await signup.mutateAsync(values, {
            onSettled: (response) => {
                resetForm();
                setSubmitting(false);
            },
        });
    };

    return (
        <AbsoluteCenter>
            <VStack w="310px" gap="3">
                <Heading size="lg">{t("sign.register")}</Heading>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={{ username: "", password: "", confirm: "" }}
                    validationSchema={signupSchema(
                        t("sign.username.input.error.required"),
                        {
                            msg: t("sign.password.input.error.required"),
                            match: t("sign.password.input.error.require"),
                        },
                        {
                            confirm: t("sign.password.confirm.error.same"),
                            required: t("sign.password.confirm.error.required"),
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

                                <InputField
                                    pwd
                                    noLeft
                                    id="confirm"
                                    left={<Lock />}
                                    name="confirm"
                                    type="password"
                                    placeholder={
                                        t(
                                            "sign.password.confirm.hint"
                                        ) as string
                                    }
                                />

                                <Box w="full">
                                    <Link
                                        as={NavLink}
                                        to={"/signin"}
                                        color="teal.400"
                                        _hover={{}}
                                    >
                                        {t("sign.toSignin")}
                                    </Link>
                                </Box>

                                <SignButton
                                    w="70%"
                                    fontSize="lg"
                                    isLoading={context.isSubmitting}
                                >
                                    {t("sign.signup")}
                                </SignButton>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </VStack>
        </AbsoluteCenter>
    );
};

export default SignupPage;
