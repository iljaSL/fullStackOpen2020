import React from "react";

const OneCountry = ({ countries }) => {
  return (
    <div>
      <h1>{countries[0].name}</h1>
      <p>capital {countries[0].capital}</p>
      <p>population {countries[0].population}</p>
      <h2>languages</h2>
      <ul>
        {countries[0].languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={countries[0].flag} alt="flag" height={200} width={300} />
    </div>
  );
};

export default OneCountry;
