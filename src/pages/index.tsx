import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Home | Toaki</title>
            </Head>

            <h5>Bem vindo(a) ao sistema de gerenciamento de estoques!</h5>

            <div className="my-5">
                <ul>
                    <li>
                        Acesse <strong>"Produtos"</strong> para cadastrar/consultar os produtos disponíveis
                    </li>
                    <li>
                        Acesse <strong>"Clientes"</strong> para cadastrar/consultar clientes
                    </li>
                    <li>
                        Acesse <strong>"Fornecedores"</strong> para cadastrar/consultar fornecedores
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
