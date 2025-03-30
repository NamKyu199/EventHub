import { ReactNode } from "react";

export interface Category {
    _id: string,
    key: string,
    title: string;
    icon: ReactNode;
    color: string;
}