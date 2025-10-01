export default function Avatar({ src, size }) {
  return (
    <img
      src={src}
      style={{ borderRadius: "50%", width: `${size}rem`, height: `${size}rem` }}
    />
  );
}
