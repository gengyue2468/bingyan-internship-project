import { useState, useEffect, useRef } from "react";
import Flex from "../layouts/Flex";

export default function DropDown({ menu, children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", zIndex: 2 }}>
      <button {...props} onClick={() => setIsOpen(!isOpen)}>
        {children}
      </button>
      <div
        style={{
          position: "absolute",
          top: "4rem",
          right: "0.5rem",
          opacity: isOpen ? 1 : 0,
          transitionProperty: "all",
          transitionDuration: "300ms",
          translate: `0 ${isOpen ? 0 : "-2rem"}`,
          background: "var(--background)",
          border: "1px solid",
          borderColor: "var(--border)",
          zIndex: isOpen ? 21 : 0,
          paddingInline: "1rem",
          paddingBlock: "0.325rem",
          borderRadius: "0.75rem",
          width: "fit-content",
          textAlign: "left",
        }}
      >
        <Flex
          direction="column"
          gap={2}
          disabledCenter={true}
          style={{ textAlign: "left" }}
        >
          {menu}
        </Flex>
      </div>
    </div>
  );
}
