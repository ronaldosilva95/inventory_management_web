import { ClientType } from './client.type';
import { ProductType } from './product.type';

export type SaleType = {
    saleId?: number;
    date: string;
    productId: number;
    clientId: number;
    client?: ClientType;
    product?: ProductType;
};
