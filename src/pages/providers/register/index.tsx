import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useInventory } from '../../../contexts/InventoryContext';

export default function RegisterProvider() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const {
        currentProvider,
        clearCurrentProvider,
        saveCurrentProvider,
        deleteCurrentProvider,
    } = useInventory();

    useEffect(() => {
        if (currentProvider.providerId != null) {
            setName(currentProvider.name);
            setAddress(currentProvider.address);
            setPhone(currentProvider.phone);
        }
    }, []);

    async function saveProvider() {
        return await saveCurrentProvider({
            name: name,
            address: address,
            phone: phone,
            providerId: currentProvider.providerId,
        });
    }

    async function deleteProvider() {
        return await deleteCurrentProvider(Number(currentProvider.providerId));
    }

    return (
        <div>
            <h1>Registra fornecedor</h1>
            <div className="row g-3 col-md-8 ">
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                        Nome
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        value={name}
                        onChange={i => setName(i.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                        Endereço
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="address"
                        value={address}
                        onChange={i => setAddress(i.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                        Telefone
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={i => setPhone(i.target.value)}
                    />
                </div>

                <div className="gap-2 d-md-block">
                    <Link href="/providers">
                        <button
                            className="btn btn-success mx-1"
                            onClick={saveProvider}
                        >
                            Confirmar
                        </button>
                    </Link>
                    <Link href="/providers">
                        <button
                            className="btn btn-danger mx-1"
                            onClick={deleteProvider}
                            disabled={currentProvider.providerId == null}
                        >
                            Excluir fornecedor
                        </button>
                    </Link>
                    <Link href="/providers">
                        <button
                            className="btn btn-secondary mx-1"
                            onClick={() => clearCurrentProvider()}
                        >
                            Cancelar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
