import { useState } from "react";
import Flex from "../layouts/Flex";
import { ChevronDownIcon } from "./Icons";

export default function Accordion({ title, height, content, detail = false }) {
  const [collapse, setCollapse] = useState(!detail);

  const iconStyle = { height: "1rem", width: "1rem" };
  return (
    <div
      style={{
        transitionProperty: "all",
        transitionDuration: "500ms",
        width: "100%",
        paddingBlock: "0.25rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Flex
        direction="row"
        justify="between"
        style={{
          width: "100%",
        }}
        onClick={() => setCollapse(!collapse)}
      >
        <h3 onClick={() => setCollapse(!collapse)} style={{ flex: 1 }}>
          {title}
        </h3>
        <button
          onClick={() => setCollapse(!collapse)}
          className="iconButton normalButton ghostButton"
        >
          <ChevronDownIcon
            style={{
              rotate: !collapse ? "180deg" : "0deg",
              ...iconStyle,
              transitionProperty: "all",
              transitionDuration: "500ms",
            }}
          />
        </button>
      </Flex>
      <div
        style={{
          height: collapse ? 0 : height,
          overflowY: "auto",
          transitionProperty: "all",
          transitionDuration: "500ms",
        }}
      >
        {content}
      </div>
    </div>
  );
}
