import Flex from "./Flex";
import {
  BellFilled,
  BellLinear,
  ChatFilled,
  ChatLinear,
  CompassFilled,
  CompassLinear,
  HomeLinear,
  HomeFilled,
  PinterestIcon,
  PlusFilled,
  PlusLinear,
  SettingsFilled,
  SettingsLinear,
} from "../ui/Icons";
import NavButton from "../ui/NavButton";

export default function Sidebar() {
  const iconStyle = { width: "1.5rem", height: "1.5rem" };
  const navItems = [
    {
      title: "Home",
      href: "/",
      linearIcon: <HomeLinear style={iconStyle} />,
      filledIcon: <HomeFilled style={iconStyle} />,
    },
    {
      title: "Discover",
      href: "/discover",
      linearIcon: <CompassLinear style={iconStyle} />,
      filledIcon: <CompassFilled style={iconStyle} />,
    },
    {
      title: "Plus",
      href: "/plus?",
      linearIcon: <PlusLinear style={iconStyle} />,
      filledIcon: <PlusFilled style={iconStyle} />,
    },
    {
      title: "Notifications",
      href: "/notifications",
      linearIcon: <BellLinear style={iconStyle} />,
      filledIcon: <BellFilled style={iconStyle} />,
    },
    {
      title: "Chat",
      href: "/chat?",
      linearIcon: <ChatLinear style={iconStyle} />,
      filledIcon: <ChatFilled style={iconStyle} />,
    },
  ];
  return (
    <div
      style={{
        width: '5rem',
        height: "100vh",
        paddingInline: "1rem",
        paddingBlock: "4rem",
        borderRight: "1px solid var(--border)",
        display: 'flex',
        justifyItems: 'center',
      }}
    >
      <Flex direction="column" gap={8} style={{ height: '100%'}}>
        <NavButton
          linearIcon={<PinterestIcon style={iconStyle} />}
          filledIcon={<PinterestIcon style={iconStyle} />}
        />
        <Flex direction="column" gap={16} justify="between" style={{ flex: 1 }}>
          <Flex direction="column" gap={4}>
            {navItems.map((nav, index) => (
              <NavButton
                key={index}
                linearIcon={nav.linearIcon}
                filledIcon={nav.filledIcon}
              />
            ))}
          </Flex>
          <div>
            <NavButton
              linearIcon={<SettingsLinear style={iconStyle} />}
              filledIcon={<SettingsFilled style={iconStyle} />}
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
