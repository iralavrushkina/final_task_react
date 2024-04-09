import { useForm, SubmitHandler } from "react-hook-form";
import { UseAppDispatch } from "../hook";
import { addNewPost } from "../store/postsSlice";
import { ItemInp, FormValues } from "../type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { validationSchema } from "../validationSchema";

const PostForm: React.FC = () => {
    const dispatch = UseAppDispatch();

    const [itemsInp, setItems] = useState<ItemInp[]>([]);
    const addItem = () =>
        setItems([
            ...itemsInp,
            {
                id: itemsInp.length,
            },
        ]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            body: "",
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(addNewPost(data));
        reset();
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form__header">Add new Post</h2>
            <label className="form__title">
                Tittle of your post
                <input
                    className="form__inputfield"
                    placeholder="Enter tittle..."
                    {...register("title")}
                />
                <div className="err">
                    <p>{errors.title?.message}</p>
                </div>
            </label>
            <label className="form__title">
                Your post
                <input
                    className="form__inputfield"
                    placeholder="Enter your post..."
                    {...register("body")}
                />
                <div className="err">
                    <p>{errors.body?.message}</p>
                </div>
            </label>
            <div>
                {itemsInp.map((inp) => (
                    <label className="form__title">
                        Post id
                        <input
                            className="form__inputfield"
                            {...register("id")}
                            key={inp.id}
                            placeholder="enter id"
                        />
                    </label>
                ))}
                <div className="err">
                    <p>{errors.id?.message}</p>
                </div>
                <button
                    disabled={itemsInp.length === 1}
                    className="form__btn_add"
                    onClick={addItem}
                >
                    Add Id
                </button>
            </div>
            <input className="form__btn_submit" type="submit" />
        </form>
    );
};
export default PostForm;
