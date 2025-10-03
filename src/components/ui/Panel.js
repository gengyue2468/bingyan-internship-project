export default function Panel({ display, translatePercent = "50%", children }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "5rem",
        top: "50%",
        transform: `translateY(-${translatePercent})`,
        transitionProperty: "all",
        transitionDuration: "500ms",
        translate: `${display ? "0.5rem" : "0px"} 0`,
        opacity: display ? 1 : 0,
        background: "var(--background)",
        color: "var(--foreground)",
        borderRadius: "1rem",
        border: "1px solid",
        borderColor: "var(--border)",
        paddingInline: "1.5rem",
        paddingBlock: "2rem",
        minWidth: "100%",
        whiteSpace: "nowrap",
        fontWeight: 400,
        textAlign: "left",
        boxShadow: "0 1px 4px var(--accent)",
        zIndex: 25,
        pointerEvents: display ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}
