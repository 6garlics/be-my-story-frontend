import { createContext } from "react";

const ColorContext = createContext({
  theme1: "#2991FF",
  theme2: "#54A7FF",
  theme3: "#78B9FF",
  theme4: "#96C9FF",
  theme5: "#BEDDFF",
  color: "white",
  background: "#151528",
});

export default ColorContext;
