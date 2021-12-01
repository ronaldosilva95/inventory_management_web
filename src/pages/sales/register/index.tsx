import { ChangeEvent, useEffect, useState } from 'react';
import { clientDefault, productDefault, useInventory } from '../../../contexts/InventoryContext';
import { ClientType } from '../../../types/client.type';
import { ProductType } from '../../../types/product.type';
import Link from 'next/link';

export default function RegisterSale() {
    const [productSaleList, setProductSaleList] = useState<ProductType[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [client, setClient] = useState<ClientType>(clientDefault);
    const [product, setProduct] = useState<ProductType>(productDefault);

    const {
        loadProducts,
        loadClients,
        productList,
        clientList,
        currentProduct,
        setCurrentProduct,
        currentClient,
        setCurrentClient,
        saveCurrentSale,
    } = useInventory();

    useEffect(() => {
        loadProducts();
        loadClients();
    }, []);

    useEffect(() => {
        setCurrentProduct({ ...currentProduct, quantity: quantity });
    }, [quantity]);

    function handleSelectProduct(e: ChangeEvent<HTMLSelectElement>) {
        const selectedProduct: ProductType[] = productList.filter(p => p.productId === Number(e.target.value));
        setProduct(selectedProduct[0]);
    }

    function handleSelectClient(e: ChangeEvent<HTMLSelectElement>) {
        const selectClient: ClientType[] = clientList.filter(c => c.clientId === Number(e.target.value));
        setClient(selectClient[0]);
    }

    async function saveSale() {
        return await saveCurrentSale({
            clientId: Number(client.clientId),
            productId: Number(product.productId),
            date: new Date().toString(),
        });
    }

    return (
        <div>
            <h3>Registrar venda</h3>

            <div className={'col-md-4'}>
                <label className={'form-label'} htmlFor="selectProducts">
                    Cliente
                </label>
                <select className={'form-select'} name="clients" id="selectClients" onChange={handleSelectClient}>
                    <option value="0">Selecione um cliente</option>
                    {clientList.map(c => {
                        return (
                            <option value={c.clientId} key={c.clientId}>
                                {c.name}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="row">
                <div className={'col-md-4'}>
                    <label className={'form-label'} htmlFor="selectProducts">
                        Produto
                    </label>
                    <select className={'form-select'} name="products" id="selectProducts" onChange={handleSelectProduct}>
                        <option value="0">Selecione um produto</option>
                        {productList.map(p => {
                            return (
                                <option value={p.productId} key={p.productId}>
                                    {p.description}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className="gap-2 mt-4 d-md-block">
                <Link href="/sales">
                    <button className={'btn btn-success mx-1'} onClick={saveSale}>
                        Confirmar
                    </button>
                </Link>

                <Link href="/sales">
                    <button className={'btn btn-secondary mx-1'}>Cancelar</button>
                </Link>
            </div>
        </div>
    );
}
