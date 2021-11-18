import { ClientType } from '../types/client.type';
import { api } from './api';

const CLIENT_URI = '/clients';

export async function createClient(client: ClientType) {
    return api.post(CLIENT_URI, client);
}

export async function updateClient(client: ClientType) {
    return api.put(CLIENT_URI, client);
}

export async function deleteClient(clientId: number) {
    return api.delete(CLIENT_URI + `/${clientId}`);
}

export async function getAllClients() {
    return await api.get(CLIENT_URI);
}

export async function getClientById(clientId: number) {
    return await api.get(CLIENT_URI + `/ ${clientId}`);
}
