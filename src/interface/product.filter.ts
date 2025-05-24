export type TFilter = {
    _id?: string;
    title: string;
    filterId: number;
    options: {
        optionId?: number;
        value: string;
    }[];
};
