export interface TProductCategory {
    _id: string;
    name: string;
    fields: string[];
}

export interface TCategory {
    name: string;
    parent_id: string | null;
    product_details_categories: TProductCategory[];
    _id: string;
    isDeleted?: boolean;
}

export interface TTreeCategory {
    name: string;
    parent_id: string | null;
    product_details_categories: TProductCategory[];
    _id: string;
    subCategories: TTreeCategory[];
    isDeleted?: boolean;
}

export interface TCreateCategory {
    name: string;
    parent_id: string | null;
    product_details_categories: string[];
}

export interface TUpdateCategory {
    name: string;
    product_details_categories: string[];
}

console.log('first');
