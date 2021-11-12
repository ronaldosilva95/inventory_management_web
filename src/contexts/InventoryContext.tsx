import { createContext, ReactNode, useContext, useState } from 'react';
import { ProductType } from '../types/product.type';

type InventoryContextData = {
    productList: ProductType[];
};
type InventoryContextProviderProps = {
    children: ReactNode;
};

export const InventoryContext = createContext({} as InventoryContextData);

export function InventoryContextProvider({
    children,
}: InventoryContextProviderProps) {
    const [productList, setProductList] = useState([]);
    return (
        <InventoryContext.Provider value={{ productList }}>
            {children}
        </InventoryContext.Provider>
    );
}

export const useInventory = () => {
    return useContext(InventoryContext);
};
