export default function Tooltip({ display, information, direction = "right" }) {
  let directionStyle;
  switch (direction) {
    case "right":
      directionStyle = {
        left: "3.25rem",
        top: "50%",
        transform: "translateY(-50%)",
      };
      break;
    case "left":
      directionStyle = {
        right: "3.25rem",
        top: "50%",
        transform: "translateY(-50%)",
      };
      break;
    case "down":
      directionStyle = {
        top: "3.25rem",
        left: "50%",
        transform: "translateX(-50%)",
      };
      break;
    case "up":
      directionStyle = {
        bottom: "3.25rem",
        left: "50%",
        transform: "translateX(-50%)",
      };
  }
  return (
    <div
      style={{
        position: "absolute",
        transitionProperty: "all",
        transitionDuration: "500ms",
        translate: `${display ? "0.5rem" : "0px"} 0`,
        opacity: display ? 1 : 0,
        background: "var(--foreground)",
        color: "var(--background)",
        borderRadius: "0.75rem",
        paddingInline: "0.75rem",
        paddingBlock: "0.5rem",
        minWidth: "100%",
        whiteSpace: "nowrap",
        fontWeight: 500,
        zIndex: 20,
        ...directionStyle,
      }}
    >
      <p style={{ textAlign: "center" }}>{information}</p>
    </div>
  );
}
