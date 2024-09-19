export interface TProductCategory {
  _id?: string;
  name: string;
  fields: string[];
}

export interface TCategory {
  name: string,
  parent_id: string,
  product_details_categories: TProductCategory[],
  _id: string,
  subCategories: TCategory[]
}
