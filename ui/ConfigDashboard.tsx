import * as React from "react";
import styled from "@emotion/styled";


export default  styled(({ config }) =>{
  const [currentParams, setParams] = React.useState(config);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setParams((prevState) => {
      config[name] = value;
      console.log(config);
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div >
      {Object.keys(currentParams).map((paramName) => {
        return (
          <>
            <div>{paramName}</div>
            <input
              name={paramName}
              type="text"
              value={currentParams[paramName]}
              onChange={handleChange}
            />
          </>
        );
      })}
    </div>
  );
})()
