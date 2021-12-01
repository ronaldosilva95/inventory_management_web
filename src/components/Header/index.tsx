import Link from 'next/link';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { AiOutlineHome } from 'react-icons/ai';
import { BsInboxes, BsPerson } from 'react-icons/bs';
import { MdWorkOutline, MdOutlineSell } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';

export function Header() {
    const currentDate = format(new Date(), 'eeee, PPP', {
        locale: ptBR,
    });

    return (
        // <header className={styles.headerContainer}>
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link href="/">
                                <a className="nav-link px-2 text-secondary">
                                    <AiOutlineHome />
                                    <span className="mx-1">Home</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/products">
                                <a className="nav-link px-2 text-white">
                                    <BsInboxes />
                                    <span className="mx-1">Produtos</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/clients">
                                <a className="nav-link px-2 text-white">
                                    <BsPerson />
                                    <span className="mx-1">Clientes</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/providers">
                                <a className="nav-link px-2 text-white">
                                    <MdWorkOutline />
                                    <span className="mx-1">Fornecedores</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/sales">
                                <a className="nav-link px-2 text-white">
                                    <MdOutlineSell />
                                    <span className="mx-1">Vendas</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/reports">
                                <a className="nav-link px-2 text-white">
                                    <HiOutlineDocumentReport />
                                    <span className="mx-1">Relatórios</span>
                                </a>
                            </Link>
                        </li>
                    </ul>

                    <div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2">
                            Login
                        </button>
                        <button type="button" className="btn btn-warning">
                            Sign-up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
