export default function IconButton({ icon, ...props }) {
  return (
    <button
      type="button"
      style={{
        height: "3rem",
        width: "3rem",
        padding: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.75rem",
      }}
      className="normalButton ghostButton iconButton"
      {...props}
    >
      {icon}
    </button>
  );
}
