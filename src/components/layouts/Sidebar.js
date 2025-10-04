import Flex from "./Flex";
import {
  BellFilled,
  BellLinear,
  ChatFilled,
  ChatLinear,
  HomeLinear,
  HomeFilled,
  PinterestIcon,
  PlusFilled,
  PlusLinear,
  SettingsFilled,
  SettingsLinear,
} from "../ui/Icons";
import NavButton from "../ui/NavButton";
import { useEffect, useState } from "react";
import PlusPanel from "@/contents/PlusPanel";
import UpdatePanel from "@/contents/UpdatePanel";
import SettingsPanel from "@/contents/SettingsPanel";
import MessagePanel from "@/contents/MessagePanel";
import { useRouter } from "next/router";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const iconStyle = { width: "1.5rem", height: "1.5rem" };
  const isMobile = useDeviceType();
  const navItems = [
    {
      title: "主页",
      href: "/",
      linearIcon: <HomeLinear style={iconStyle} />,
      filledIcon: <HomeFilled style={iconStyle} />,
    },
    {
      title: "创建",
      linearIcon: <PlusLinear style={iconStyle} />,
      filledIcon: <PlusFilled style={iconStyle} />,
      pannelContent: <PlusPanel />,
      translatePercent: isMobile ? "50%" : "5%",
    },
    {
      title: "更新",
      linearIcon: <BellLinear style={iconStyle} />,
      filledIcon: <BellFilled style={iconStyle} />,
      pannelContent: <UpdatePanel />,
      translatePercent: isMobile ? "50%" : "25%",
    },
    {
      title: "消息",
      linearIcon: <ChatLinear style={iconStyle} />,
      filledIcon: <ChatFilled style={iconStyle} />,
      pannelContent: <MessagePanel reset={() => setActiveIndex(1)} />,
      translatePercent: isMobile ? "65%" : "50%",
    },
  ];

  useEffect(() => {
    if (router.asPath === "/" && activeIndex === -1) {
      setActiveIndex(1);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyItems: "center",
        alignContent: "center",
        background: "var(--background)",
        zIndex: 26,
      }}
      className="sidebar"
    >
      <div
        onClick={(e) => {
          setActiveIndex(-1);
          e.stopPropagation();
        }}
        style={{
          position: "fixed",
          width: activeIndex === 1 ? 0 : "100%",
          height: activeIndex === 1 ? 0 : "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "transparent",
          zIndex: activeIndex === 1 ? -9999 : 0,
          pointerEvents: activeIndex !== 1 ? "auto" : "none",
        }}
      />
      <Flex
        direction={isMobile ? "row" : "column"}
        gap={isMobile ? 4 : 8}
        style={isMobile ? { width: "100%" } : { height: "100%" }}
      >
        <NavButton
          title="主页"
          linearIcon={<PinterestIcon style={iconStyle} />}
          filledIcon={<PinterestIcon style={iconStyle} />}
          isPressed={activeIndex === 0}
          disabledPanel={true}
          onClick={() => {
            setActiveIndex(1);
            router.push("/");
          }}
        />
        <Flex
          direction={isMobile ? "row" : "column"}
          gap={isMobile ? 4 : 16}
          justify="between"
          style={{ flex: 1 }}
        >
          <Flex direction={isMobile ? "row" : "column"} gap={isMobile ? 3 : 6}>
            {navItems.map((nav, index) => (
              <NavButton
                key={index}
                title={nav.title}
                linearIcon={nav.linearIcon}
                filledIcon={nav.filledIcon}
                pannelContent={nav.pannelContent}
                translatePercent={
                  nav.translatePercent ? nav.translatePercent : "50%"
                }
                disabledPanel={index === 0}
                isPressed={activeIndex === index + 1}
                onClick={() =>
                  setActiveIndex(activeIndex === index + 1 ? -1 : index + 1)
                }
              />
            ))}
          </Flex>
          <div>
            <NavButton
              title="设置与支持"
              linearIcon={<SettingsLinear style={iconStyle} />}
              filledIcon={<SettingsFilled style={iconStyle} />}
              isPressed={activeIndex === navItems.length + 1}
              pannelContent={<SettingsPanel reset={() => setActiveIndex(1)} />}
              translatePercent={isMobile ? "95%" : "100%"}
              onClick={() =>
                setActiveIndex(
                  activeIndex === navItems.length + 1 ? -1 : navItems.length + 1
                )
              }
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
