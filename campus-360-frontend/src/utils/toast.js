import toast from "react-hot-toast";

const baseOptions = {
  duration: 4000,
};

export const notify = {
  success: (message) => toast.success(message, baseOptions),
  error: (message) =>
    toast.error(message, { ...baseOptions, duration: 5000 }),
  loading: (message) => toast.loading(message),
  dismiss: (id) => toast.dismiss(id),
};

export default notify;
