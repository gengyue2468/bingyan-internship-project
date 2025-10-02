import Avatar from "../ui/Avatar";
import { SearchIcon } from "../ui/Icons";
import Flex from "./Flex";

export default function Topbar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        background: "var(--background)",
        zIndex: 5,
      }}
    >
      <div
        style={{
          paddingInline: "1rem",
          paddingBlock: "1rem",
        }}
      >
        <Flex direction="row" gap={8} justify="between">
          <div style={{ position: "relative", flex: 1 }}>
            <SearchIcon
              style={{
                position: "absolute",
                left: "1.25rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
            <input
              type="search"
              placeholder="搜索..."
              style={{ width: "100%", height: "100%" }}
              className="searchBar"
            />
          </div>
          <div style={{ width: '8rem'}}>
            <Avatar src="/static/logo.webp" size={2} />
          </div>
        </Flex>
      </div>
    </div>
  );
}
