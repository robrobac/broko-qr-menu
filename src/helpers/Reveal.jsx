import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion"

const Reveal = ({ children }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {amount: .1})

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        } else {
            mainControls.start("hidden")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView])

    return (
      <div ref={ref} style={{ position: "relative" }}>
        <motion.div
            variants={{
                hidden: {opacity: 0, y: 60},
                visible: {opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{
                duration: .3,
                delay: .1
            }}
        >{children}</motion.div>
      </div>
    );
  };
  
  export { Reveal };