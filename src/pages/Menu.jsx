import React, { useState } from "react";

import Slider from "../components/Slider";

const category = [
  {
    name: "All Hotel",
    icon: "fas fa-info-circle",
    link: "/",
  },
  {
    name: "Add Hotel",
    icon: "fas fa-hotel",
    link: "/add",
  }
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const showAnimationText = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.28,
      },
    },
    show: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };
  return (
    <>
      <Slider
        category={category}
        open={open}
        setOpen={setOpen}
        showAnimationText={showAnimationText}
      />
    </>
  );
};

export default Menu;
