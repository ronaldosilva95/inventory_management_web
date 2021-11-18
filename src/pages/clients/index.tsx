import { FiEdit, FiXCircle, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import { useInventory } from '../../contexts/InventoryContext';
import { useEffect } from 'react';

export default function Clients() {
    const { clientList, loadClients, clearCurrentClient, setCurrentClient, deleteCurrentClient } = useInventory();

    useEffect(() => {
        loadClients();
    }, []);

    async function deleteClient(clientId: number) {
        await deleteCurrentClient(clientId);
        await loadClients();
        return;
    }

    return (
        <div>
            <Head>
                <title>Clientes | Toaki</title>
            </Head>
            <h3 className="mb-5">Listagem de Clientes</h3>

            <div>
                <button className="btn btn-success" onClick={() => clearCurrentClient()}>
                    <Link href="/clients/register">
                        <label htmlFor="">
                            <FiPlus />
                            Adicionar cliente
                        </label>
                    </Link>
                </button>
            </div>
            <div>
                <table className="table table-striped">
                    <thead className="">
                        <tr>
                            <th className="col-md-4">Nome</th>
                            <th className="col-md-2">Endereço</th>
                            <th className="col-md-2">Telefone</th>
                            <th className="col-md-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientList.map(c => {
                            return (
                                <tr key={c.clientId}>
                                    <td>{c.name}</td>
                                    <td>{c.address}</td>
                                    <td>{c.phone}</td>
                                    <td>
                                        <Link href="/clients/register">
                                            <span>
                                                <FiEdit onClick={() => setCurrentClient(c)} />
                                            </span>
                                        </Link>
                                        <FiXCircle onClick={() => deleteClient(Number(c.clientId))} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
