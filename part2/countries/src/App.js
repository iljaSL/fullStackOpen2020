import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import DisplayCountries from "./components/DisplayCountries";
import axios from "axios";

function App() {
  const [countries, setCountires] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll] = useState(true);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountires(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const countriesToShow = showAll
    ? countries.filter((countries) =>
        countries.name.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <DisplayCountries countries={countriesToShow} search={search} />
    </div>
  );
}

export default App;
