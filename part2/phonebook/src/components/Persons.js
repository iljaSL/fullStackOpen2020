import React from "react";

const Persons = ({ person }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
    </div>
  );
};

export default Persons;
