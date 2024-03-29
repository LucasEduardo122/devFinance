import { useEffect, useState } from "react";

interface typeData {
  id: string,
  description: string,
  date: string,
  type: string,
  category: string,
  value: string
}


interface isActiveType {
  isActive: boolean,
  state: (dados: boolean) => void;
  setdata: (dados: typeData[]) => void;
  data: typeData[]
}


export default function Modal({ isActive, state, setdata, data }: isActiveType) {

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  let count = 0;

  function closeModal() {
    state(false);
  }

  function dataSend(event: any) {
    event.preventDefault();

    setdata([...data, {
      id: `${count}`,
      description: description,
      date: date,
      type: type,
      category: category,
      value: value
    }]);

    count + 1;

    state(false)
    setDescription("");
    setValue("")
    setDate("");
    setCategory("");
    setType("");
  }

  return (
    <div className={`modal-overlay ${isActive ? 'active' : ''}`} data-modal="add-active">
      <div className="modal">
        <div id="htmlForm">
          <h2>Novo Dado</h2>
          <form action="">
            <div className="input-group">
              <label className="sr-only" htmlFor="description">Descrição</label>
              <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} placeholder="Description" value={description} />
            </div>

            <div className="input-group">
              <label className="sr-only" htmlFor="amount">Valor</label>
              <input type="text" id="amount" onChange={(e) => setValue(e.target.value)} placeholder="0.00" value={value} />
            </div>

            <div className="input-group">
              <label className="sr-only" htmlFor="date">Date</label>
              <input type="date" id="date" onChange={(e) => setDate(e.target.value)} placeholder="Data" value={date} />
            </div>

            <div className="input-select">
              <label htmlFor="category">Category</label>
              <select name="category" onChange={(e) => setCategory(e.target.value)} id="category" value={category}>
                <option value="">Selecionar</option>
                <option value="Twitch">Twitch</option>
                <option value="VPS">Vps</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="input-select">
              <label htmlFor="type">Tipo</label>
              <select id="type" name="type" onChange={(e) => setType(e.target.value)} value={type}>
                <option value="">Selecionar</option>
                <option value="saida">Saida</option>
                <option value="entrada">Entrada</option>
              </select>
            </div>

            <div className="input-group actions ">
              <button className="btn-form add" onClick={dataSend} type="submit">Add</button>
              <a href="#" onClick={closeModal} className="btn-form btn-cancel" data-btn="close">Cancel</a>
            </div>
            <a href="#" onClick={closeModal} className="btn-form cancel btn-exit" data-btn="close">X</a>
          </form>
        </div>
      </div>
    </div>
  )
}