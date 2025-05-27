import React from "react";
import { Label } from "semantic-ui-react";
import { typeColors } from "../assets/data.js"; // colors are still stored in types.js

const Types = ({ types }) => {
  return (
    <Label.Group>
      {types.map((typeObj) => {
        const type = typeObj.type.name;
        return (
          <Label
            key={type}
            basic
            style={{
              margin: "2px",
              color: typeColors[type] || "grey",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              opacity: 0.9,
              borderRadius: "9999px",
              fontWeight: "bold",
              textTransform: "capitalize",
              padding: "6px 12px",
              border: `2px solid ${typeColors[type] || "grey"}`,
            }}
          >
            {type}
          </Label>
        );
      })}
    </Label.Group>
  );
};

export { Types };
