import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useInventory } from '../../../contexts/InventoryContext';

export default function RegisterProducts() {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [quantity, setQuantity] = useState('');

    const { currentProduct, setCurrentProduct, clearCurrentProduct, saveCurrentProduct, deleteCurrentProduct, loadProviders, providerList } = useInventory();

    useEffect(() => {
        if (currentProduct.productId != null) {
            setDescription(currentProduct.description);
            setValue(currentProduct.value.toString());
            setQuantity(currentProduct.quantity.toString());
        }

        loadProviders();
    }, []);

    async function saveProduct() {
        return await saveCurrentProduct({
            description: description,
            quantity: Number(quantity),
            value: Number(value),
            productId: currentProduct.productId,
        });
    }

    async function deleteProduct() {
        return await deleteCurrentProduct(Number(currentProduct.productId));
    }

    return (
        <div>
            <h1>Registra produto</h1>
            <div className="row g-3 col-md-8 ">
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                        Descrição
                    </label>
                    <input className="form-control" type="text" id="description" value={description} onChange={i => setDescription(i.target.value)} />
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="value">
                            Valor
                        </label>
                        <input className="form-control" type="text" id="value" value={value} onChange={i => setValue(i.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="quantity">
                            Quantidade
                        </label>
                        <input className="form-control" type="number" id="quantity" min="0" value={quantity} onChange={i => setQuantity(i.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="form-label" htmlFor="provider">
                        Fornecedor
                    </label>
                    <select className="form-select" id="provider">
                        {providerList.map(p => {
                            return (
                                <option key={p.providerId} value={p.providerId}>
                                    {p.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="gap-2 d-md-block">
                    <Link href="/products">
                        <button className="btn btn-success mx-1" onClick={saveProduct}>
                            Confirmar
                        </button>
                    </Link>
                    <Link href="/products">
                        <button className="btn btn-danger mx-1" onClick={deleteProduct} disabled={currentProduct.productId == null}>
                            Excluir produto
                        </button>
                    </Link>
                    <Link href="/products">
                        <button className="btn btn-secondary mx-1" onClick={() => clearCurrentProduct()}>
                            Cancelar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
