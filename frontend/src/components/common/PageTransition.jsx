import { motion } from "framer-motion";
import clsx from "clsx";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
