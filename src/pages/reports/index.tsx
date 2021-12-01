import { FiEdit, FiXCircle, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import { useInventory } from '../../contexts/InventoryContext';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export default function Providers() {
    const {
        providerList,
        setCurrentProvider,
        clearCurrentProvider,
        loadProviders,
        deleteCurrentProvider,
        loadProductsLessSaled,
        loadProductsMoreSaled,
        productsReport,
    } = useInventory();

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        loadProviders();
    }, []);

    async function deleteProvider(providerId: number) {
        await deleteCurrentProvider(providerId);
        await loadProviders();
        return;
    }

    useEffect(() => {
        if (tabIndex == 0) {
            loadProductsMoreSaled();
        } else {
            loadProductsLessSaled();
        }
    }, [tabIndex]);

    return (
        <div>
            <Head>
                <title>Relatórios | Toaki</title>
            </Head>
            <h3 className="mb-5">Relatórios</h3>

            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(Number(index))}>
                <TabList>
                    <Tab>Produtos mais vendidos</Tab>
                    <Tab>Produtos menos vendidos</Tab>
                </TabList>

                <TabPanel>
                    <div>
                        <table className="table table-striped">
                            <thead className="">
                                <tr>
                                    <th className="col-md-4">Produto</th>
                                    <th className="col-md-2">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsReport.map(p => {
                                    return (
                                        <tr key={p.description}>
                                            <td>{p.description}</td>
                                            <td>{p.quantity}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        <table className="table table-striped">
                            <thead className="">
                                <tr>
                                    <th className="col-md-4">Produto</th>
                                    <th className="col-md-2">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsReport.map(p => {
                                    return (
                                        <tr key={p.description}>
                                            <td>{p.description}</td>
                                            <td>{p.quantity}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
