import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import styles from '../styles/app.module.scss';
import { Footer } from '../components/Footer';
import { InventoryContextProvider } from '../contexts/InventoryContext';

function MyApp({ Component, pageProps }: AppProps) {
    //return <Component {...pageProps} />;
    return (
        <InventoryContextProvider>
            <div>
                <Header />
                <div className={styles.container}>
                    {/* <Sidebar /> */}
                    <div className="container-fluid">
                        <Component {...pageProps} />
                    </div>
                </div>
                <Footer />
            </div>
        </InventoryContextProvider>
    );
}

export default MyApp;
