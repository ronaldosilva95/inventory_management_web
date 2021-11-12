import { FiEdit, FiXCircle, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { ProductType } from '../../types/product.type';

import { getAllProducts } from '../../service/products.api';

type ProductsProps = {
    productList: ProductType[];
};

export default function Products({ productList }: ProductsProps) {
    console.log(productList);

    return (
        <div>
            <Head>
                <title>Produtos | Toaki</title>
            </Head>
            <h1>Produtos</h1>
            <div>
                <button className="btn btn-success">
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
                                <tr>
                                    <td>{p.description}</td>
                                    <td>{p.value}</td>
                                    <td>{p.quantity}</td>
                                    <td>
                                        <FiEdit />
                                        <FiXCircle />
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

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await getAllProducts();
    console.log(data);

    return {
        props: {
            productList: data,
        },
        revalidate: 60 * 60 * 1, // 1 hora
    };
};
