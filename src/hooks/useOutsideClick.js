import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener("click", handleOutsideClick, listenCapturing);

    return () =>
      document.removeEventListener(
        "click",
        handleOutsideClick,
        listenCapturing
      );
  }, [handler, listenCapturing]);

  return ref;
}

export default useOutsideClick;
