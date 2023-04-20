import { TFunction } from "i18next";
import * as yup from "yup";

export default (t: TFunction) => {
    return yup.object().shape({
        title: yup
            .string()
            .required(t("sidebar.addTodo.title.required") as any),
        description: yup
            .string()
            .required(t("sidebar.addTodo.description.required") as any),
    });
};
