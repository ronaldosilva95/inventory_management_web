import { FiEdit, FiXCircle, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';

import { useEffect } from 'react';
import { useInventory } from '../../contexts/InventoryContext';

export default function Products() {
    const { productList, setCurrentProduct, clearCurrentProduct, loadProducts, deleteCurrentProduct } = useInventory();

    useEffect(() => {
        loadProducts();
    }, []);

    async function deleteProduct(productId: number) {
        await deleteCurrentProduct(productId);
        await loadProducts();
        return;
    }

    return (
        <div>
            <Head>
                <title>Produtos | Toaki</title>
            </Head>
            <h3 className="mb-5">Listagem de Produtos</h3>
            <div>
                <button className="btn btn-success" onClick={() => clearCurrentProduct()}>
                    <Link href="/products/register">
                        <label htmlFor="">
                            <FiPlus />
                            Adicionar produto
                        </label>
                    </Link>
                </button>
            </div>
            <div>
                <table className="table table-striped">
                    <thead className="">
                        <tr>
                            <th className="col-md-4">Descrição</th>
                            <th className="col-md-2">Valor</th>
                            <th className="col-md-2">Qtde.</th>
                            <th className="col-md-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map(p => {
                            return (
                                <tr key={p.productId}>
                                    <td>{p.description}</td>
                                    <td>{p.value}</td>
                                    <td>{p.quantity}</td>
                                    <td>
                                        <Link href="/products/register">
                                            <span className="mx-1">
                                                <FiEdit onClick={() => setCurrentProduct(p)} />
                                            </span>
                                        </Link>
                                        <span className="mx-1">
                                            <FiXCircle onClick={() => deleteProduct(Number(p.productId))} />
                                        </span>
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

// export const getStaticProps: GetStaticProps = async () => {
//     const { data } = await getAllProducts();

//     return {
//         props: {
//             productList: data,
//         },
//         revalidate: 60 * 60 * 1, // 1 hora
//     };
// };
