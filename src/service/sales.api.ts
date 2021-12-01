import { SaleType } from '../types/sale.type';
import { api } from './api';

const SALE_URI = '/sales';

export async function createSale(sale: SaleType) {
    return api.post(SALE_URI, sale);
}

// export async function updateSale(sale: SaleType) {
//     return api.put(SALE_URI, sale);
// }

export async function deleteSale(saleId: number) {
    return api.delete(SALE_URI + `/${saleId}`);
}

export async function getAllSales() {
    return await api.get(SALE_URI);
}

// export async function getClientById(saleId: number) {
//     return await api.get(SALE_URI + `/ ${saleId}`);
// }
