export type Post = {
    userId: string;
    id: string;
    title: string;
    body: string;
};
export type postState = {
    list: Post[];
    loading: boolean;
    error: string | null;
};

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};
export type todoState = {
    list: Todo[];
    loading: boolean;
    error: string | null;
};
export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        city: string;
        street: string;
    };
    company: { bs: string };
};
export type userState = {
    list: User[];
    loading: boolean;
    error: string | null;
};

export type UserInputProps = {
    value: string;
    updateText: (str: string) => void;
    handleAction: () => void;
};
export type FormValues = {
    title: string;
    body: string;
    id: number;
};
export type ItemInp = {
    id: number;
};
export type Album = {
    id: string;
    title: string;
};
export type albumState = {
    list: Album[];
    loading: boolean;
    error: string | null;
};
