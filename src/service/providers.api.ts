import { ProviderType } from '../types/provider.type';
import { api } from './api';

const PRODUCT_URI = '/providers';

export async function createProvider(provider: ProviderType) {
    return await api.post(PRODUCT_URI, provider);
}

export async function updateProvider(provider: ProviderType) {
    return await api.put(PRODUCT_URI, provider);
}

export async function deleteProvider(providerId: number) {
    return await api.delete(PRODUCT_URI + `/${providerId}`);
}

export async function getAllProviders() {
    return await api.get(PRODUCT_URI);
}

export async function getProviderById(providerId: number) {
    return await api.delete(PRODUCT_URI + `/${providerId}`);
}
