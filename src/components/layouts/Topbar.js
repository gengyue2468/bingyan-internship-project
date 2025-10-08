import { useState } from "react";
import Avatar from "../ui/Avatar";
import { ChevronDownIcon } from "../ui/Icons";
import Tooltip from "../ui/Tooltip";
import Flex from "./Flex";
import DropDown from "../ui/Dropdown";
import UserMenuContent from "@/contents/UserMenuContent";
import Searchbar from "../ui/SearchBar";
import { useDeviceType } from "@/hooks/useDeviceType";
import Dialog from "../ui/Dialog";
import Login from "@/contents/Login";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Topbar() {
  const [avatarIsHovered, setAvatarIsHovered] = useState(false);
  const [accountIsHovered, setAccountIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useDeviceType();
  const { data: session } = useSession();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: isMobile ? "100%" : "calc(100% - 4.5rem)",
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
        zIndex: 27,
      }}
    >
      <div
        style={{
          paddingInline: "1rem",
          paddingBlock: isMobile ? "0.5rem" : "1rem",
        }}
      >
        <Flex direction="row" gap={isMobile ? 2 : 8} justify="between">
          <Searchbar />
          <Flex gap={2} style={{ zIndex: 15 }}>
            {session && (
              <div style={{ position: "relative" }}>
                <Avatar
                  src={session.user.image}
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
            )}
            <Dialog
              onClick={() => setOpen(true)}
              open={open}
              content={<Login />}
              close={() => setOpen(false)}
            >
              {!session && (
                <button
                  type="button"
                  style={{
                    background: "var(--bingo)",
                    paddingInline: "1rem",
                    paddingBlock: "0.75rem",
                    borderRadius: "1rem",
                    color: "#ffffff",
                  }}
                >
                  登录
                </button>
              )}
            </Dialog>
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
