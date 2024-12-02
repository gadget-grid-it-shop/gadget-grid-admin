export interface TReview {
  rating: number;
  review: string;
}

export interface TProductCategory {
  main: boolean;
  id: string;
}

export type TProductWarrenty = {
  days: number;
  lifetime: boolean;
};

export interface TProductAttribute {
  name: string;
  fields: Record<string, string>;
}

export interface TMeta {
  title: string;
  description: string;
  image: string;
}

export type TShipping = {
  free: boolean;
  cost: number;
};

export type TProduct = {
  id: string;
  name: string;
  price: number;
  discount?: {
    type: 'flat' | 'percent';
    value: number;
  };
  sku: string;
  brand: string;
  model: string;
  warranty: TProductWarrenty;
  reviews?: TReview[];
  key_features: string;
  quantity: number;
  category: TProductCategory[];
  description: string;
  videos?: string[];
  gallery?: string[];
  thumbnail: string;
  slug: string;
  attributes?: TProductAttribute[];
  meta?: TMeta;
  tags?: string[];
  isFeatured?: boolean;
  sales?: number;
  createdBy: string;
  shipping: TShipping;
};
