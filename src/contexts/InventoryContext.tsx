import { createContext, ReactNode, useContext, useState } from 'react';
import { createClient, deleteClient, getAllClients, updateClient } from '../service/clients.api';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsLessSaled,
    getProductsMoreSaled,
    updateProduct,
} from '../service/products.api';
import { createProvider, deleteProvider, getAllProviders, updateProvider } from '../service/providers.api';
import { createSale, deleteSale, getAllSales } from '../service/sales.api';
import { ClientType } from '../types/client.type';
import { ProductType } from '../types/product.type';
import { ProviderType } from '../types/provider.type';
import { SaleType } from '../types/sale.type';

type InventoryContextData = {
    productList: ProductType[];
    clientList: ClientType[];
    providerList: ProviderType[];
    saleList: SaleType[];
    productsReport: ProductType[];
    currentProduct: ProductType;
    currentClient: ClientType;
    currentProvider: ProviderType;
    currentSale: SaleType;
    setCurrentProduct: (product: ProductType) => void;
    setCurrentClient: (client: ClientType) => void;
    setCurrentProvider: (provider: ProviderType) => void;
    setCurrentSale: (sale: SaleType) => void;
    clearCurrentProduct: () => void;
    clearCurrentClient: () => void;
    clearCurrentProvider: () => void;
    clearCurrentSale: () => void;
    loadProducts: () => void;
    getProduct: (productId: number) => any;
    loadClients: () => void;
    loadProviders: () => void;
    loadSales: () => void;
    loadProductsMoreSaled: () => void;
    loadProductsLessSaled: () => void;
    saveCurrentProduct: (product: ProductType) => void;
    saveCurrentClient: (client: ClientType) => void;
    saveCurrentProvider: (provider: ProviderType) => void;
    saveCurrentSale: (sale: SaleType) => void;
    deleteCurrentProduct: (productId: number) => void;
    deleteCurrentClient: (clientId: number) => void;
    deleteCurrentProvider: (providerId: number) => void;
    deleteCurrentSale: (saleId: number) => void;
};

type InventoryContextProviderProps = {
    children: ReactNode;
};

export const productDefault: ProductType = {
    description: '',
    value: 0,
    quantity: 0,
    providerId: 0,
};

export const clientDefault: ClientType = {
    name: '',
    address: '',
    phone: '',
};

export const providerDefault: ProviderType = {
    name: '',
    phone: '',
    address: '',
};

export const saleDefault: SaleType = {
    clientId: 0,
    productId: 0,
    date: '',
};

export const InventoryContext = createContext({} as InventoryContextData);

export function InventoryContextProvider({ children }: InventoryContextProviderProps) {
    const [productList, setProductList] = useState<ProductType[]>([]);
    const [clientList, setClientList] = useState<ClientType[]>([]);
    const [providerList, setProviderList] = useState<ProviderType[]>([]);
    const [saleList, setSaleList] = useState<SaleType[]>([]);

    const [productsReport, setProductsReport] = useState<ProductType[]>([]);

    const [currentProduct, setCurrentProduct] = useState<ProductType>(productDefault);
    const [currentClient, setCurrentClient] = useState<ClientType>(clientDefault);
    const [currentProvider, setCurrentProvider] = useState<ProviderType>(providerDefault);
    const [currentSale, setCurrentSale] = useState<SaleType>(saleDefault);

    function clearCurrentProduct() {
        setCurrentProduct(productDefault);
    }

    function clearCurrentClient() {
        setCurrentClient(clientDefault);
    }

    async function clearCurrentProvider() {
        setCurrentProvider(providerDefault);
    }

    async function clearCurrentSale() {
        setCurrentSale(saleDefault);
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

    async function loadSales() {
        const { data } = await getAllSales();
        setSaleList(data);
        return data;
    }

    async function loadProductsLessSaled() {
        const { data } = await getProductsLessSaled();
        setProductsReport(data);
        return data;
    }

    async function loadProductsMoreSaled() {
        const { data } = await getProductsMoreSaled();
        setProductsReport(data);
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

    async function saveCurrentSale(sale: SaleType) {
        if (sale.saleId != null) {
            return;
        }

        return await createSale(sale);
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

    async function deleteCurrentSale(saleId: number) {
        return await deleteSale(saleId);
    }

    return (
        <InventoryContext.Provider
            value={{
                productList,
                clientList,
                providerList,
                saleList,
                productsReport,
                currentProduct,
                currentClient,
                currentProvider,
                currentSale,
                setCurrentProduct,
                setCurrentClient,
                setCurrentProvider,
                setCurrentSale,
                clearCurrentProduct,
                clearCurrentClient,
                clearCurrentProvider,
                clearCurrentSale,
                loadProducts,
                getProduct,
                loadClients,
                loadProviders,
                loadSales,
                loadProductsMoreSaled,
                loadProductsLessSaled,
                saveCurrentProduct,
                saveCurrentClient,
                saveCurrentProvider,
                saveCurrentSale,
                deleteCurrentProduct,
                deleteCurrentClient,
                deleteCurrentProvider,
                deleteCurrentSale,
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
}

export const useInventory = () => {
    return useContext(InventoryContext);
};
