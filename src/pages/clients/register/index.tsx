import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useInventory } from '../../../contexts/InventoryContext';

export default function Register() {
    const [nameClient, setNameClient] = useState('');
    const [addressClient, setAddressClient] = useState('');
    const [phoneClient, setPhoneClient] = useState('');

    const {
        currentClient,
        clearCurrentClient,
        saveCurrentClient,
        deleteCurrentClient,
        loadProviders,
    } = useInventory();

    useEffect(() => {
        if (currentClient.clientId != null) {
            setNameClient(currentClient.name);
            setAddressClient(currentClient.address);
            setPhoneClient(currentClient.phone);
        }

        loadProviders();
    }, []);

    async function saveClient() {
        return await saveCurrentClient({
            name: nameClient,
            address: addressClient,
            phone: phoneClient,
            clientId: currentClient.clientId,
        });
    }

    async function deleteClient() {
        return await deleteCurrentClient(Number(currentClient.clientId));
    }

    return (
        <div>
            <h1>Registra cliente</h1>
            <div className="row g-3 col-md-8 ">
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                        Nome
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        value={nameClient}
                        onChange={i => setNameClient(i.target.value)}
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
                        value={addressClient}
                        onChange={i => setAddressClient(i.target.value)}
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
                        value={phoneClient}
                        onChange={i => setPhoneClient(i.target.value)}
                    />
                </div>

                <div className="gap-2 d-md-block">
                    <Link href="/clients">
                        <button
                            className="btn btn-success mx-1"
                            onClick={saveClient}
                        >
                            Confirmar
                        </button>
                    </Link>
                    <Link href="/clients">
                        <button
                            className="btn btn-danger mx-1"
                            onClick={deleteClient}
                            disabled={currentClient.clientId == null}
                        >
                            Excluir cliente
                        </button>
                    </Link>
                    <Link href="/clients">
                        <button
                            className="btn btn-secondary mx-1"
                            onClick={() => clearCurrentClient()}
                        >
                            Cancelar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
