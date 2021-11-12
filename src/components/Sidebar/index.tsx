import Link from 'next/link';
import styles from './styles.module.scss';

export function Sidebar() {
    return (
        <div className={styles.sidebarContainer}>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/products">
                        <a>Produtos</a>
                    </Link>
                </li>
                <li>
                    <Link href="/clients">
                        <a>Clientes</a>
                    </Link>
                </li>
                <li>
                    <Link href="/providers">
                        <a>Fornecedores</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
