import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Modal from "../components/modal";

interface typeData {
    id: string,
    description: string,
    date: string,
    type: string,
    category: string,
    value: string
}


export default function Home() {
    const [data, setData] = useState<typeData[]>([])
    const [activeModal, setActiveModal] = useState(false);

    let entrada = 285.54;
    let saida = 0

    data.map(saidas => (
        saidas.type == 'saida' ? saida += Number(saidas.value) : entrada = entrada + Number(saidas.value)
    ))

    const total = entrada - saida;

    const formatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    function addTransaction(event: any) {
        event.preventDefault();
        setActiveModal(true);
    }

    return (
        <>
            <Header />
            <main className="container">
                <section id="balance">
                    <h2 className="sr-only">Balança</h2>

                    <div className="card">
                        <h3>
                            <span>Entrada</span>
                            <img src="./src/assets/income.svg" alt="Income's image" />
                        </h3>
                        <p>R$ {entrada}</p>
                    </div>

                    <div className="card">
                        <h3>
                            <span>Saída</span>
                            <img src="./src/assets/expense.svg" alt="Expenses's image" />
                        </h3>
                        <p>{saida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>

                    <div className="card total">
                        <h3>
                            <span>Total</span>
                            <img src="./src/assets/total.svg" alt="" />
                        </h3>
                        <p> {formatado}</p>
                    </div>
                </section>

                <section id="transaction">
                    <h2 className="sr-only">Transações</h2>

                    <a href="#" onClick={addTransaction} className="button new" data-btn="add">+ Add</a>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Categoria</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length != 0
                                ?
                                data.map(dados => {
                                    return (
                                        <tr key={dados.id}>
                                            <td className="description">{dados.description}</td>
                                            <td className={`${dados.type == 'saida' ? 'expense' : 'income'}`}>R${dados.value}</td>
                                            <td className="date">{dados.date}</td>
                                            <td>{dados.category}</td>
                                            <td>{dados.type == 'entrada' ? <img src="/src/assets/plus.svg" alt="remove valor" /> : <img src="/src/assets/minus.svg" alt="adiciona valor" />}</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td className="description">Nenhum dado encontrado</td>
                                    <td className="expense">R$0</td>
                                    <td className="date">OOPS</td>
                                    <td>Sem dado</td>
                                    <td><img src="./src/assets/plus.svg" alt="adiciona valor" /></td>
                                </tr>}

                        </tbody>
                    </table>
                </section>
            </main>
            <Footer />
            <Modal isActive={activeModal} state={setActiveModal} data={data} setdata={setData} />
        </>
    )
}