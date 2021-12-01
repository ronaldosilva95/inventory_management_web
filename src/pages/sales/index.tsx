import { FiEdit, FiXCircle, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import { useInventory } from '../../contexts/InventoryContext';

export default function Sales() {
    const { saleList, loadSales, clearCurrentSale, deleteCurrentSale } = useInventory();

    useEffect(() => {
        loadSales();
    }, []);

    async function deleteSale(saleId: number) {
        await deleteCurrentSale(saleId);
        await loadSales();
        return;
    }

    return (
        <div>
            <Head>
                <title>Vendas | Toaki</title>
            </Head>
            <h3 className="mb-5">Vendas realizadas</h3>

            <div>
                <Link href="/sales/register">
                    <button className="btn btn-success" onClick={() => clearCurrentSale()}>
                        <label htmlFor="">
                            <FiPlus />
                            Adicionar venda
                        </label>
                    </button>
                </Link>
            </div>
            <div>
                <table className="table table-striped">
                    <thead className="">
                        <tr>
                            <th className="col-md-4">Cliente</th>
                            <th className="col-md-2">Produto</th>
                            <th className="col-md-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleList.map(s => {
                            return (
                                <tr>
                                    <td>{s.client?.name}</td>
                                    <td>{s.product?.description}</td>
                                    <td>
                                        <FiXCircle onClick={() => deleteSale(Number(s.saleId))} />
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
