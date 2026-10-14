import { useEffect } from "react";

const APP_NAME = "Campus 360";

export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;

    return () => {
      document.title = previous;
    };
  }, [title]);
}

export default useDocumentTitle;
