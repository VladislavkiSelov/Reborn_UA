import React, { useState } from 'react';
import '../../css/App.css';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    if (searchTerm !== "") {
      try {
        const response = await axios.get(``);
        setSearchResults(response.data || []);
      } catch (error) {
        console.error("Помилка під час виконання запиту:", error);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div>
      <input
        className="searchField"
        type="text"
        placeholder="Пошук..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
}

export default Search;
