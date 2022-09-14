import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListaLivros({ livros }) {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/ListBooks").then((res) => {
      const dadosLivros = res.data;
      setLivros(dadosLivros);
    });
  });

  return (
    <div>
      {livros.map((livro) => (
        <div key={livro.id}>
          {livro.id} - {livro.title} - {livro.author}
        </div>
      ))}
    </div>
  );
}
