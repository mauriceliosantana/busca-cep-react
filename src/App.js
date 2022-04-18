import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import api from "./services/api";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Digite algum CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Opa! Tem algum erro aí");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">BuscaCEP</h1>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <BiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}
