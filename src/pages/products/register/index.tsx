import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('0.00');
    const [quantity, setQuantity] = useState('');

    return (
        <div>
            <h1>Registra produto</h1>
            <div className="row g-3 col-md-8 ">
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                        Descrição
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="description"
                    />
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="value">
                            Valor
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="value"
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="quantity">
                            Quantidade
                        </label>
                        <input
                            className="form-control"
                            type="number"
                            id="quantity"
                            min="0"
                        />
                    </div>
                </div>
                <div>
                    <label className="form-label" htmlFor="provider">
                        Fornecedor
                    </label>
                    <select className="form-select" id="provider">
                        <option value="1">Fornecedor 1</option>
                        <option value="2">Fornecedor 2</option>
                        <option value="3">Fornecedor 3</option>
                        <option value="4">Fornecedor 4</option>
                    </select>
                </div>

                <div className="gap-2 d-md-block">
                    <button className="btn btn-success mx-1">Confirmar</button>
                    <Link href="/products">
                        <button className="btn btn-secondary mx-1">
                            Cancelar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
