import * as yup from "yup";

// minimum one uppercase, one lowercase, one special
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/;

export const usernameSchema = (msg: string) => {
    return yup.object().shape({
        username: yup.string().required(msg),
    });
};

export const passwordSchema = ({ msg, match }: any) => {
    return yup.object().shape({
        password: yup.string().required(msg).matches(passwordRegex, match),
    });
};

export const signinSchema = (usernameMsg: string, passwordMsg: any) => {
    return usernameSchema(usernameMsg).concat(passwordSchema(passwordMsg));
};

export const signupSchema = (
    usernameMsg: string,
    passwordMsg: any,
    confirm: any
) => {
    return signinSchema(usernameMsg, passwordMsg).concat(
        yup.object().shape({
            confirm: yup
                .string()
                .required(confirm.required)
                .oneOf([yup.ref("password")], confirm.confirm),
        })
    );
};
