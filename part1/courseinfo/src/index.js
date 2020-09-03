import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = "Half Stack application development";
  const courseContent = {
    part: [
      {
        courseName: "Fundamentals of React",
        exercises: 10,
      },
      {
        courseName: "Using props to pass data",
        exercises: 7,
      },
      {
        courseName: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content part={courseContent.part} />
      <Total part={courseContent.part} />
    </div>
  );
};

const Header = (props) => <p>{props.course}</p>;

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.part[0].courseName}
        exercises={props.part[0].exercises}
      />
      <Part
        part={props.part[1].courseName}
        exercises={props.part[1].exercises}
      />
      <Part
        part={props.part[2].courseName}
        exercises={props.part[2].exercises}
      />
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {""}
        {props.part[0].exercises +
          props.part[1].exercises +
          props.part[2].exercises}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
