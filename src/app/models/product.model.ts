import { Category } from './category.model';
import { Delivery } from './delivery.model';
import { Review } from './review.model';
import { SEO } from './seo.model';
import { Sku } from './sku.model';

export interface Product {
        id: number;
        design: any;
        productId: string;
        title: string;
        description: string;
        shortDescription: string;
        categoryId: number;
        mainImage: string;
        backgroundImage: string;
        videoUrl: string;
        productPrice: string;
        discountText: string;
        slug: string;
        brandId: number;
        quantity: number;
        orderCount: number;
        ratingCount: number;
        packageWeight: string;
        packageLength: string;
        packageWidth: string;
        packageHeight: string;
        codAvailable: number;
        status: string;
        discountPrice: number;
        skuModule: Sku;
        deliveryModule: Delivery;
        returnAndWarrantyModule: [
            {
                days: string;
                returnTerm: string;
            },
            {
                warranty: string;
            }
        ];
        review: Review;
        specifications: Specifications[];
        seo_module: SEO;
        category: Category;
        brand: Brand;
        image_module: Image_module[];

}


export interface Specifications {
  attrKey: string;
  attrValue: string;
}

export interface Brand {
  brand_id: number;
  brand_name: string;
  brand_logo: string;
}
export interface Image_module {
  largeImage: string;
  smallImage: string;
}
