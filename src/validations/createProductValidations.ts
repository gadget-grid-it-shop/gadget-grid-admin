import { z } from 'zod';

// Define the product category schema
const ProductCategorySchema = z.object({
    main: z.boolean({
        required_error: 'Please specify if this is a main category.',
    }),
    id: z
        .string({ required_error: 'Please provide a category ID.' })
        .min(1, 'Please provide a category ID.'),
});

// const ReviewSchema = z.object({
//     rating: z.number({ required_error: "Please provide a review rating." }),
//     review: z.string({ required_error: "Please provide review text." })
// });

const MetaSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
});

const generalDataValidationSchema = z.object({
    name: z
        .string({ required_error: 'Please enter the product name.' })
        .min(1, 'Please enter the product name.'),
    price: z
        .number({ required_error: 'Please enter the product price.' })
        .min(1, 'Please enter the product price.'),
    discount: z
        .object({
            type: z.string().optional(),
            value: z.number().optional(),
        })
        .optional(),
    sku: z
        .string({ required_error: 'Please provide the product SKU.' })
        .min(1, 'Please provide the product SKU.'),
    brand: z
        .string({ required_error: 'Please specify the product brand.' })
        .min(1, 'Please specify the product brand.'),
    model: z.string().optional(),
    warranty: z.object({
        days: z.number({
            required_error: 'Please provide the warranty period in days.',
        }),
        lifetime: z.boolean({
            required_error: 'Please specify if the warranty is lifetime.',
        }),
    }),
    // reviews: z.array(ReviewSchema).optional(),
    key_features: z
        .string({
            required_error: 'Please enter the key features of the product.',
        })
        .min(1, 'Please enter the key features of the product.'),
    quantity: z
        .number({ required_error: 'Please specify the product quantity.' })
        .min(1, 'Please specify the product quantity.'),
    category: z
        .array(ProductCategorySchema)
        .min(1, 'Please select at least one product category.'),
    thumbnail: z
        .string({ required_error: 'Please upload a product thumbnail.' })
        .min(1, 'Please upload a product thumbnail.'),
    gallery: z.array(z.string()).optional(),
    filters: z.array(
        z.object({
            filter: z.string(),
            key: z.string(),
            value: z.string().min(1, 'Please select filter value'),
        }),
    ),
});

const attributeValidationSchema = z.object({
    attributes: z
        .array(
            z.object({
                name: z
                    .string({
                        required_error: 'Please provide an attribute name.',
                    })
                    .min(1, 'Please provide an attribute name.'),
                fields: z.record(z.string(), z.string()),
            }),
        )
        .min(1, 'Please add at least one attribute.'),
});

// Define the main product schema
export const createProductValidationSchema = z.object({
    description: z
        .string({ required_error: 'Please provide a product description.' })
        .min(1, 'Please provide a product description.'),
    videos: z.array(z.string()).optional(),
    meta: MetaSchema.optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
});

export const ProductValidations = {
    generalDataValidationSchema,
    attributeValidationSchema,
    createProductValidationSchema,
};
