export default function Tooltip({ display, information }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "3.25rem",
        top: "50%",
        transform: "translateY(-50%)",
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
        zIndex: 15,
      }}
    >
      <p style={{ textAlign: "center" }}>{information}</p>
    </div>
  );
}
