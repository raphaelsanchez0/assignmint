import { useEffect, RefObject } from "react";

export default function useOnClickOutside(
    refs: RefObject<HTMLElement>[],
    handler: (event: Event) => void,
) {
    useEffect(() => {
        const listener = (event: Event) => {
            // Do nothing if clicking any ref's element or descendent elements
            if (
                refs.some(
                    (ref) =>
                        ref.current &&
                        ref.current.contains(event.target as Node),
                )
            ) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [refs, handler]);
}
