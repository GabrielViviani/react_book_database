import React, { useState, useEffect } from "react";
import "./feed.css";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Search/searchbar";
import HeaderMain from "../../components/HeaderMain/HeaderMain";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [wasUpdated, setWasUpdated] = useState(false);

  function listBooks() {
    axios
      .get("http://localhost:8080/ListBooks")
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
          <SearchBar
            placeholder="Insira o Autor que deseja pesquisar"
            data={posts}
          />
          {posts.map((post, key) => {
            return (
              <div className="card" key={key}>
                <h1>Título: {post.title}</h1>
                <div className="line-post"></div>
                <p>Autor : {post.author}</p>
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
