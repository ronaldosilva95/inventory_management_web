import { createContext, ReactNode, useContext, useState } from 'react';
import {
    createClient,
    deleteClient,
    getAllClients,
    updateClient,
} from '../service/clients.api';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from '../service/products.api';
import {
    createProvider,
    deleteProvider,
    getAllProviders,
    updateProvider,
} from '../service/providers.api';
import { ClientType } from '../types/client.type';
import { ProductType } from '../types/product.type';
import { ProviderType } from '../types/provider.type';

type InventoryContextData = {
    productList: ProductType[];
    clientList: ClientType[];
    providerList: ProviderType[];
    currentProduct: ProductType;
    currentClient: ClientType;
    currentProvider: ProviderType;
    setCurrentProduct: (product: ProductType) => void;
    setCurrentClient: (client: ClientType) => void;
    setCurrentProvider: (provider: ProviderType) => void;
    clearCurrentProduct: () => void;
    clearCurrentClient: () => void;
    clearCurrentProvider: () => void;
    loadProducts: () => void;
    getProduct: (productId: number) => any;
    loadClients: () => void;
    loadProviders: () => void;
    saveCurrentProduct: (product: ProductType) => void;
    saveCurrentClient: (client: ClientType) => void;
    saveCurrentProvider: (provider: ProviderType) => void;
    deleteCurrentProduct: (productId: number) => void;
    deleteCurrentClient: (clientId: number) => void;
    deleteCurrentProvider: (providerId: number) => void;
};

type InventoryContextProviderProps = {
    children: ReactNode;
};

const productDefault: ProductType = {
    description: '',
    value: 0,
    quantity: 0,
};

const clientDefault: ClientType = {
    name: '',
    address: '',
    phone: '',
};

const providerDefault: ProviderType = {
    name: '',
    phone: '',
    address: '',
};

export const InventoryContext = createContext({} as InventoryContextData);

export function InventoryContextProvider({
    children,
}: InventoryContextProviderProps) {
    const [productList, setProductList] = useState<ProductType[]>([]);
    const [clientList, setClientList] = useState<ClientType[]>([]);
    const [providerList, setProviderList] = useState<ProviderType[]>([]);

    const [currentProduct, setCurrentProduct] =
        useState<ProductType>(productDefault);

    const [currentClient, setCurrentClient] =
        useState<ClientType>(clientDefault);

    const [currentProvider, setCurrentProvider] =
        useState<ProviderType>(providerDefault);

    function clearCurrentProduct() {
        setCurrentProduct(productDefault);
    }

    function clearCurrentClient() {
        setCurrentClient(clientDefault);
    }

    async function clearCurrentProvider() {
        setCurrentProvider(providerDefault);
    }

    async function loadProducts() {
        const { data } = await getAllProducts();
        setProductList(data);
        return data;
    }

    async function getProduct(productId: number) {
        const { data } = await getProductById(productId);
        return data;
    }

    async function loadClients() {
        const { data } = await getAllClients();
        setClientList(data);
        return data;
    }

    async function loadProviders() {
        const { data } = await getAllProviders();
        setProviderList(data);
        return data;
    }

    async function saveCurrentProduct(product: ProductType) {
        if (product.productId != null) {
            return await updateProduct(product);
        }

        return await createProduct(product);
    }

    async function saveCurrentClient(client: ClientType) {
        if (client.clientId != null) {
            return await updateClient(client);
        }

        return await createClient(client);
    }

    async function saveCurrentProvider(provider: ProviderType) {
        if (provider.providerId != null) {
            return await updateProvider(provider);
        }

        return await createProvider(provider);
    }

    async function deleteCurrentProduct(productId: number) {
        return await deleteProduct(productId);
    }

    async function deleteCurrentClient(clientId: number) {
        return await deleteClient(clientId);
    }

    async function deleteCurrentProvider(providerId: number) {
        return await deleteProvider(providerId);
    }

    return (
        <InventoryContext.Provider
            value={{
                productList,
                clientList,
                providerList,
                currentProduct,
                currentClient,
                currentProvider,
                setCurrentProduct,
                setCurrentClient,
                setCurrentProvider,
                clearCurrentProduct,
                clearCurrentClient,
                clearCurrentProvider,
                loadProducts,
                getProduct,
                loadClients,
                loadProviders,
                saveCurrentProduct,
                saveCurrentClient,
                saveCurrentProvider,
                deleteCurrentProduct,
                deleteCurrentClient,
                deleteCurrentProvider,
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
}

export const useInventory = () => {
    return useContext(InventoryContext);
};
