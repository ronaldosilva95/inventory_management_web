import { ChangeEvent, useEffect, useState } from 'react';
import { useInventory } from '../../../contexts/InventoryContext';
import { ClientType } from '../../../types/client.type';
import { ProductType } from '../../../types/product.type';
import Link from 'next/link';

export default function RegisterSale() {
    const [productSaleList, setProductSaleList] = useState<ProductType[]>([]);
    //const [currentProduct, setCurrentProduct] = useState<ProductType>({});
    const {
        loadProducts,
        loadClients,
        productList,
        clientList,
        currentProduct,
        setCurrentProduct,
        currentClient,
        setCurrentClient,
    } = useInventory();

    useEffect(() => {
        loadProducts();
        loadClients();
    }, []);

    function handleSelectProduct(e: ChangeEvent<HTMLSelectElement>) {
        const selectedProduct: ProductType[] = productList.filter(p => p.productId === Number(e.target.value));
        console.log(selectedProduct);
        setCurrentProduct(selectedProduct[0]);
    }

    function handleSelectClient(e: ChangeEvent<HTMLSelectElement>) {
        const selectClient: ClientType[] = clientList.filter(c => c.clientId === Number(e.target.value));
        console.log(selectClient);
        setCurrentClient(selectClient[0]);
    }

    return (
        <div>
            <h3>Registrar venda</h3>

            <div className="row">
                <div className={'col-md-4'}>
                    <label className={'form-label'} htmlFor="selectProducts">
                        Produto
                    </label>
                    <select className={'form-control'} name="products" id="selectProducts" onChange={handleSelectProduct}>
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
                <div className={'col-md-2'}>
                    <label className={'form-label'} htmlFor="selectProducts">
                        Qtde
                    </label>
                    <input className={'form-control'} type="number" name="quantity" id="inputQuantity" min={0} />
                </div>
            </div>

            <div className={'col-md-6'}>
                <label className={'form-label'} htmlFor="selectProducts">
                    Cliente
                </label>
                <select className={'form-control'} name="clients" id="selectClients" onChange={handleSelectClient}>
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
            <div className="gap-2 d-md-block">
                <Link href="/sales">
                    <button className={'btn btn-success mx-1'}>Confirmar</button>
                </Link>

                <Link href="/sales">
                    <button className={'btn btn-secondary mx-1'}>Cancelar</button>
                </Link>
            </div>
        </div>
    );
}
