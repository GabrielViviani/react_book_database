import React, { useState } from "react";
import Feed from "../../pages/Feed/feed";
import "./searchbar.css";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = data.filter((value) => {
      return value.author.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleFilter} />
        <div className="searchIcon"></div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value) => {
            return (
              <a className="dataItem">
                {" "}
                <p key={value.title}>
                  {value.title} - {value.author}
                </p>{" "}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
