import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Slider = ({ category, open, setOpen, showAnimationText }) => {
  return (
    <>
      <motion.div
        animate={{
          width: open ? "200px" : "50px",
          transition: { duration: 0.33, type: "just" },
        }}
        className="h-screen  flex flex-col gap-y-4 "
      >
        <div className="flex items-center w-full  text-center  py-2">
          <AnimatePresence>
            {open && (
              <motion.span
                variants={showAnimationText}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="w-full pl-2 whitespace-nowrap"
              >
                Hotel Management
              </motion.span>
            )}
          </AnimatePresence>
          <i
            className="fas fa-bars text-black text-2xl cursor-pointer pr-2.5 pl-2.5 "
            onClick={() => setOpen(!open)}
          ></i>
        </div>

        <div className="flex flex-col  gap-y-12 h-[70%] pt-10 w-full ">
          {category.map((item, index) => {
            return (
              <NavLink to={item.link} key={index}>
                <div className="flex items-center justify-start   w-full">
                  <i
                    className={`${item.icon} 'text-black px-2 text-xl cursor-pointer'`}
                  ></i>
                  <AnimatePresence>
                    {open && (
                      <motion.span
                        variants={showAnimationText}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="w-full pl-2.5 whitespace-nowrap text-left text-sm"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </NavLink>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Slider;
