import { motion } from "framer-motion";
import clsx from "clsx";
import { fadeUp, viewportOnce } from "../../constants/motion";

const Reveal = ({
  children,
  className = "",
  variant = fadeUp,
  viewport = viewportOnce,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variant}
      className={clsx(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
