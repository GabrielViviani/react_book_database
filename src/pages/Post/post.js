import React from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./post.css";

const validationPost = yup.object().shape({
  title: yup
    .string()
    .required("O título deve ser informado.")
    .max(40, "O título pode ter no máximo 40 caracteres."),
  author: yup
    .string()
    .required("O autor deve ser informado.")
    .max(25, "O nome do autor pode ter no máximo 25 caracteres."),
});

function Post() {
  let Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const addBook = (data) =>
    axios
      .post("http://localhost:8080/books", data)
      .then(() => {
        console.log("Livro adicionado com sucesso");
        Navigate("/");
      })
      .catch(() => {
        console.log("Erro encontrado!");
      });

  return (
    <div>
      <Header />

      <main>
        <div className="card-post">
          <h1>Criar livro</h1>
          <div className="line-post"></div>
          <div className="card-body-post">
            <form onSubmit={handleSubmit(addBook)}>
              <div className="fields"></div>

              <div className="fields">
                <label>Título</label>
                <input type="text" name="title" {...register("title")} />
                <p className="error-message">{errors.title?.message}</p>
              </div>
              <div className="fields">
                <label>Autor</label>
                <input type="text" name="author" {...register("author")} />
                <p className="error-message">{errors.author?.message}</p>
              </div>

              <div className="btn-post">
                <button type="submit">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Post;
