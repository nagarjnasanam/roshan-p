import { RefObject, useEffect } from "react";

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent) => void,
    boolActivate = false
  ): void {
    useEffect(() => {
      if(!boolActivate) {
        return;
      }
      const listener = (event: MouseEvent) => {
        const el = ref?.current;
  
        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
          return;
        }
  
        handler(event);
      };
  
      document.addEventListener(`mousedown`, listener);

      return () => {
        document.removeEventListener(`mousedown`, listener);
      };
  
      // Reload only if ref or handler changes
    }, [ref, handler,boolActivate]);
  }