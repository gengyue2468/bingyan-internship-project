export default function Flex({ children, direction, gap, justify, style }) {
  let justifyType;
  switch (justify) {
    case "start":
      justifyType = "flex-start";
      break;
    case "center":
      justifyType = "center";
      break;
    case "between":
      justifyType = "space-between";
      break;
    default:
      justifyType = "flex-start";
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `calc(var(--unit)*${gap})`,
        justifyContent: justifyType,
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
