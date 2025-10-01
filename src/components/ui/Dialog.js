export default function Dialog({ open, variant = "normal" }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        transitionProperty: "all",
        transitionDuration: "0.5s",
        translate: open ? "0px 0px" : "0px -114px",
      }}
    >
      <h1>Are U Sure?</h1>
    </div>
  );
}
