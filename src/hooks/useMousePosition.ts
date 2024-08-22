import { useEffect } from "react";

/**
 * Will attach a mousemove event to the body and set x,y coordinates
 * in property variables --x and --y
 */
export default function MousePosition() {

  useEffect(() => {
    let listener = (e: any) => {
      document.body.style.setProperty("--x", `${e.x}`);
      document.body.style.setProperty("--y", `${e.y}`);
    }
    document.body.addEventListener("mousemove", listener);

    // clean it up
    return () => {
      document.body.removeEventListener("mousemove", listener);
    };
  }, []);
}
