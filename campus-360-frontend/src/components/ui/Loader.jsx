import { FullPageLoader } from "./Spinner";

const Loader = ({ label = "Loading" }) => {
  return <FullPageLoader label={label} />;
};

export default Loader;
