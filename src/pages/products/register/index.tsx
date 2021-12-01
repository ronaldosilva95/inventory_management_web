import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { providerDefault, useInventory } from '../../../contexts/InventoryContext';
import { ProviderType } from '../../../types/provider.type';

export default function RegisterProducts() {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [quantity, setQuantity] = useState('');
    const [provider, setProvider] = useState<ProviderType>(providerDefault);

    const {
        currentProduct,
        setCurrentProduct,
        clearCurrentProduct,
        saveCurrentProduct,
        deleteCurrentProduct,
        loadProviders,
        providerList,
    } = useInventory();

    useEffect(() => {
        console.log(currentProduct);

        if (currentProduct.productId != null) {
            setDescription(currentProduct.description);
            setValue(currentProduct.value.toString());
            setQuantity(currentProduct.quantity.toString());
            handleSetProvider(currentProduct.providerId);
        }

        loadProviders();
    }, []);

    async function saveProduct() {
        return await saveCurrentProduct({
            description: description,
            quantity: Number(quantity),
            value: Number(value),
            productId: currentProduct.productId,
            providerId: Number(provider.providerId),
        });
    }

    function handleSetProvider(providerId: number) {
        const selectClient: ProviderType[] = providerList.filter(c => c.providerId === providerId);
        setProvider(selectClient[0]);
    }

    function handleSelectProvider(e: ChangeEvent<HTMLSelectElement>) {
        handleSetProvider(Number(e.target.value));
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
                    <input
                        className="form-control"
                        type="text"
                        id="description"
                        value={description}
                        onChange={i => setDescription(i.target.value)}
                    />
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="value">
                            Valor
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="value"
                            value={value}
                            onChange={i => setValue(i.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="quantity">
                            Quantidade
                        </label>
                        <input
                            className="form-control"
                            type="number"
                            id="quantity"
                            min="0"
                            value={quantity}
                            onChange={i => setQuantity(i.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="form-label" htmlFor="provider">
                        Fornecedor
                    </label>
                    <select className="form-select" id="provider" onChange={handleSelectProvider} value={provider.providerId}>
                        <option value="0">Selecione o fornecedor</option>
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
                        <button
                            className="btn btn-danger mx-1"
                            onClick={deleteProduct}
                            disabled={currentProduct.productId == null}
                        >
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
