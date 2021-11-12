import { Range } from "react-range";
import * as React from "react";
import { useState, useEffect } from "react";

const SuperSimple = ({ min, max, setMin, setMax }) => {
  //   const min = 0;
  //   const max = 500;
  const [values, setValues] = useState([min, max]);
  //   const [max, setMax] = useState(500);

  //   const useEffect = (() => {}, [values]);
  const a = (min / 500) * 100;
  const b = (max / 500) * 100;
  return (
    <div>
      <Range
        step={1}
        min={0}
        max={500}
        values={values}
        onChange={(event) => {
          //   console.log(event);
          setMin(event[0]);
          setMax(event[1]);
          setValues([min, max]);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              margin: "20px 20px",
              height: "6px",
              width: "300px",
              //   backgroundColor: "#0aaeb7",
              background: `linear-gradient(to right, rgb(204, 204, 204) 0%, rgb(204, 204, 204) ${a}%, rgb(44, 177, 186) ${a}%, rgb(44, 177, 186) ${b}%, rgb(204, 204, 204) ${b}%, rgb(204, 204, 204) 100%)`,
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              //   ariaValuenow: `${min}`,
              height: "20px",
              width: "20px",
              backgroundColor: "#0aaeb7",
              borderRadius: "50%",
            }}
          />
        )}
      />
    </div>
  );
};
export default SuperSimple;
