import { motion } from "framer-motion";

const AnimatedTableRow = ({ children, index = 0, className, ...props }) => (
  <motion.tr
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
    className={className}
    {...props}
  >
    {children}
  </motion.tr>
);

export default AnimatedTableRow;
