import React from "react";

import { Link } from "react-router-dom";

import "./headerMain.css";

function HeaderMain() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>Estante Virtual</h1>
        </div>

        <div className="btn-newPost">
          <Link to="/post">
            <button>Adicionar novo livro</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderMain;
