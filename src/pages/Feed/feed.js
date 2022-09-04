import React, { useState, useEffect } from "react";
import More from "../../images/more.svg";
import "./feed.css";
import axios from "axios";
import { Link } from "react-router-dom";

import HeaderMain from "../../components/HeaderMain/HeaderMain";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [wasUpdated, setWasUpdated] = useState(false);

  function listBooks() {
    axios
      .get("http://localhost:8080/books")
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        console.log("Erro encontrado");
      });
  }

  useEffect(() => {
    listBooks();
  }, []);

  function deletePost(id) {
    axios.delete(`http://localhost:8080/books/${id}`);

    setPosts(posts.filter((post) => post._id !== id));
    setWasUpdated(true);
  }

  useEffect(() => {
    listBooks();
    setWasUpdated(false);
  }, [wasUpdated]);

  return (
    <div>
      <HeaderMain />

      <main>
        <div className="cards">
          {posts.map((post, key) => {
            return (
              <div className="card" key={key}>
                <h1>Informações do Livro</h1>
                <div className="line-post"></div>
                <p>Título : {post.title}</p>
                <p>Autor: {post.author}</p>
                <div className="btns">
                  <div className="btn-edit">
                    <Link to={{ pathname: `/edit/${post.id}` }}>
                      <button>Editar</button>
                    </Link>
                  </div>
                  <div className="btn-delete">
                    <button onClick={() => deletePost(post.id)}>Excluir</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Feed;
