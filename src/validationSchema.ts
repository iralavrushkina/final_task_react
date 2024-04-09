import * as yup from "yup";

export const validationSchema = yup
    .object({
        title: yup.string().required().min(5).max(200),
        body: yup.string().required().min(10).max(200),
        id: yup.string().min(1).max(2),
    })
    .required();
