import { useState } from "react";
import Avatar from "../ui/Avatar";
import { ChevronDownIcon } from "../ui/Icons";
import Tooltip from "../ui/Tooltip";
import Flex from "./Flex";
import DropDown from "../ui/Dropdown";
import UserMenuContent from "@/contents/UserMenuContent";
import Searchbar from "../ui/SearchBar";

export default function Topbar() {
  const [avatarIsHovered, setAvatarIsHovered] = useState(false);
  const [accountIsHovered, setAccountIsHovered] = useState(false);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "calc(100% - 4.5rem)",
        background: "var(--background)",
        zIndex: 15,
      }}
    >
      <div
        style={{
          paddingInline: "1rem",
          paddingBlock: "1rem",
          zIndex: 15,
        }}
      >
        <Flex direction="row" gap={8} justify="between">
          <Searchbar />
          <Flex gap={2} style={{ zIndex: 15 }}>
            <div style={{ position: "relative" }}>
              <Avatar
                src="/static/logo.webp"
                size={2}
                onMouseEnter={() => setAvatarIsHovered(true)}
                onMouseLeave={() => setAvatarIsHovered(false)}
              />
              <Tooltip
                display={avatarIsHovered}
                information="你的个人资料"
                direction="down"
              />
            </div>
            <div style={{ position: "relative" }}>
              <DropDown
                type="button"
                className="ghostButton normalIcon"
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                }}
                menu={<UserMenuContent />}
                onMouseEnter={() => setAccountIsHovered(true)}
                onMouseLeave={() => setAccountIsHovered(false)}
              >
                <ChevronDownIcon style={{ width: "1rem", height: "1rem" }} />
              </DropDown>
              <Tooltip
                display={accountIsHovered}
                information="账户"
                direction="down"
              />
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
