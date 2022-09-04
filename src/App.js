import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./pages/Post/post";
import Edit from "./pages/Edit/edit";
import LerMais from "./pages/LerMais/lermais";
import Feed from "./pages/Feed/feed";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route path="/post" element={<Post />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/lermais" element={<LerMais />} />
      </Routes>
    </Router>
  );
}

export default App;
