import { FiEdit, FiXCircle, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import { useInventory } from '../../contexts/InventoryContext';
import { useEffect } from 'react';

export default function Providers() {
    const { providerList, setCurrentProvider, clearCurrentProvider, loadProviders, deleteCurrentProvider } = useInventory();

    useEffect(() => {
        loadProviders();
    }, []);

    async function deleteProvider(providerId: number) {
        await deleteCurrentProvider(providerId);
        await loadProviders();
        return;
    }

    return (
        <div>
            <Head>
                <title>Fornecedores | Toaki</title>
            </Head>
            <h3 className="mb-5">Listagem de Fornecedores</h3>

            <div>
                <Link href="/providers/register">
                    <button className="btn btn-success" onClick={() => clearCurrentProvider()}>
                        <label htmlFor="">
                            <FiPlus />
                            Adicionar fornecedor
                        </label>
                    </button>
                </Link>
            </div>
            <div>
                <table className="table table-striped">
                    <thead className="">
                        <tr>
                            <th className="col-md-4">Nome</th>
                            <th className="col-md-2">Telefone</th>
                            <th className="col-md-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providerList.map(p => {
                            return (
                                <tr key={p.providerId}>
                                    <td>{p.name}</td>
                                    <td>{p.phone}</td>
                                    <td>
                                        <Link href="/providers/register">
                                            <span>
                                                <FiEdit onClick={() => setCurrentProvider(p)} />
                                            </span>
                                        </Link>
                                        <FiXCircle onClick={() => deleteProvider(Number(p.providerId))} />
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
