import { useDeviceType } from "@/hooks/useDeviceType";

export default function Dialog({ open, children, close, content, ...props }) {
  const isMobile = useDeviceType();
  return (
    <div {...props}>
      <main>{children}</main>
      <div
        style={{
          position: "fixed",
          transitionProperty: "all",
          transitionDuration: "0.5s",
          opacity: open ? 1 : 0,
          translate: open ? "0 0" : "0 114px",
          padding: isMobile ? "2rem" : "3rem",
          borderRadius: isMobile ? "2rem" : "4rem",
          background: "var(--background)",
          zIndex: 9999,
          left: "50%",
          right: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          border: "1px solid var(--border)",
          width: !isMobile ? "30rem" : "90%",
          height: "fit-content",
          maxHeight: "80vh",
          overflowY: "auto",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {content}
      </div>
      {open && (
        <div
          onClick={(e) => {
            close();
            e.stopPropagation();
          }}
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#000000",
            opacity: 0.9,
            zIndex: 9998,
          }}
        />
      )}
    </div>
  );
}
