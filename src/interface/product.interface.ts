export interface TReview {
  rating: number;
  review: string;
}

export interface TProductAttribute {
  name: string;
  fields: Record<string, string>[];
}

export interface TMeta {
  title: string;
  description: string;
  image: string;
}

export interface TProduct {
  id: string;
  name: string;
  price: number;
  discount?: {
    type: 'flat' | 'percent';
    value: number;
  };
  sku: string;
  brand: string;
  model?: string;
  warranty: string;
  reviews?: TReview[];
  key_features: string;
  quantity: number;
  category: string;
  subCategory: string;
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
}
