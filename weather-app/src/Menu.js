import React, { useState } from "react";

import menu_in from "./menu-in.png"; // with import
import menu_out from "./menu-out.png";
function Menu() {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {isShown ? <img src={menu_out} /> : <img src={menu_in} />}
      </button>
    </div>
  );
}

export default Menu;
