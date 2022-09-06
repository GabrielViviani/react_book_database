import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const validationPost = yup.object().shape({
  id: yup
    .string()
    .required("Por favor, insira um número de ID")
    .max(3, "O ID pode ter no máximo 3 dígitos."),
  title: yup
    .string()
    .required("O título deve ser informado.")
    .max(40, "O título pode ter no máximo 40 caracteres."),
  author: yup
    .string()
    .required("O autor deve ser informado.")
    .max(25, "O nome do autor pode ter no máximo 25 caracteres."),
});

function Edit() {
  const { id } = useParams();

  let Navigate = useNavigate();

  const addBook = (data) =>
    axios
      .put(`http://localhost:8080/UpdateBooks/${id}`, data)
      .then(() => {
        console.log("Livro adicionado com sucesso");
        Navigate("/");
      })
      .catch(() => {
        console.log("Erro encontrado!");
      });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationPost) });

  useEffect(() => {
    axios.put(`http://localhost:8080/UpdateBooks/${id}`).then((response) => {
      reset(response.data);
    });
  }, []);

  return (
    <div>
      <Header />

      <main>
        <div className="card-post">
          <h1>Editar registro</h1>
          <div className="line-post"></div>

          <div className="card-body-post">
            <form onSubmit={handleSubmit(addBook)}>
              <div className="fields"></div>

              <div className="fields">
                <label>Autor:</label>
                <input type="text" name="author" {...register("author")} />
                <p className="error-message">{errors.author?.message}</p>
              </div>

              <div className="fields">
                <label>Título:</label>
                <textarea
                  type="text"
                  name="content"
                  {...register("title")}
                ></textarea>
                <p className="error-message">{errors.title?.message}</p>
              </div>
              <div className="btn-post">
                <button type="submit">Atualizar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Edit;
