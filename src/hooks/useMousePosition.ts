import { useEffect, useState } from "react";

/**
 * Will attach a mousemove event to the body and set x,y coordinates
 * in property variables --x and --y
 */
export default function MousePosition() {
  useEffect(() => {
    let listen = document.body.addEventListener("mousemove", (e) => {
      document.body.style.setProperty("--x", e.x);
      document.body.style.setProperty("--y", e.y);
    });

    // clean it up
    return () => {
      document.body.removeEventListener("mousemove", listen);
    };
  }, []);
}
