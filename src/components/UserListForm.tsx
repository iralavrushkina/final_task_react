import { User } from "../type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UseAppDispatch, useAppSelector } from "../hook";
import { addNewUser } from "../store/usersSlice";
import { SubmitHandler, useForm } from "react-hook-form";

const UserListForm: React.FC = () => {
    const dispatch = UseAppDispatch();
    const users = useAppSelector((state) => state.users.list);

    const validationSchema = yup
        .object({
            name: yup.string().required().min(5),
            username: yup.string().required().min(7).max(25),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        reset,
    } = useForm<User>({
        defaultValues: {
            name: "",
            username: "",
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<User> = (data) => {
        dispatch(addNewUser(data));
        reset();
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form__header">Add New User</h2>
            <label className="form__title">
                Your name(First name Last name)
                <input
                    className="form__inputfield"
                    placeholder="Iryna Lavrushkina"
                    {...register("name")}
                    onInput={() => {
                        const nameValue = getValues("name");
                        const rep = users.find((el) => el.name === nameValue);
                        if (rep) {
                            setValue("username", rep.username);
                        }
                    }}
                />
                <div className="err">
                    <p>{errors.name?.message}</p>
                </div>
            </label>
            <label className="form__title">
                User Name
                <input
                    className="form__inputfield"
                    placeholder="irussssya"
                    {...register("username")}
                />
                <div className="err">
                    <p>{errors.username?.message}</p>
                </div>
            </label>
            <input className="form__btn_submit" type="submit" />
        </form>
    );
};
export default UserListForm;
