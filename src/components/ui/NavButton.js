export default function NavButton({
  linearIcon,
  filledIcon,
  active,
  ...props
}) {
  return (
    <button className="navButton" {...props}>
      {active ? filledIcon : linearIcon}
    </button>
  );
}
