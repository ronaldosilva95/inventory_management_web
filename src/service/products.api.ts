import { ProductType } from '../types/product.type';
import { api } from './api';

const PRODUCT_URI = '/products';

export async function createProduct(product: ProductType) {
    return await api.post(PRODUCT_URI, product);
}

export async function updateProduct(product: ProductType) {
    return await api.put(PRODUCT_URI, product);
}

export async function deleteProduct(productId: number) {
    return await api.delete(PRODUCT_URI + `/${productId}`);
}

export async function getAllProducts() {
    return await api.get(PRODUCT_URI);
}

export async function getProductById(productId: number) {
    return await api.delete(PRODUCT_URI + `/${productId}`);
}
