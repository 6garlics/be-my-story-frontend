import { createContext } from "react";

const ColorContext = createContext({
  theme1: "#606FFF",
  theme2: "#7E8BFF",
  theme3: "#97A1FF",
  theme4: "#B1B9FF",
  theme5: "#C7CCFF",
  color: "white",
  background: "#151528",
});

export default ColorContext;
