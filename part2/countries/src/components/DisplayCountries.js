import React from "react";
import Country from "./Country";
import OneCountry from "./OneCountry";

const DisplayCountries = ({ countries, search }) => {
  if (search === "") {
    return (
      <p>start with the search, by typing a couuntry into the search field!</p>
    );
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <div>
        <OneCountry countries={countries} />
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country) => (
          <Country key={country.name} country={country} />
        ))}
      </div>
    );
  }
};

export default DisplayCountries;
