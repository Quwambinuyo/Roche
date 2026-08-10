import { PRODUCTS } from "./clothing";

export const GALLERY_IMAGES = PRODUCTS.flatMap((product) =>
  (product.images?.length ? product.images : [product.image]).map((src, i) => ({
    id: `${product.slug}-${i}`,
    src,
    alt: product.name,
  })),
);
