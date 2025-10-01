import Avatar from "../ui/Avatar";
import { SearchIcon } from "../ui/Icons";
import Flex from "./Flex";

export default function Topbar() {
  return (
    <div style={{ position: "fixed", top: 0, width: "90%" }}>
      <div
        style={{
          paddingInline: "2.5rem",
          paddingBlock: "1.25rem",
        }}
      >
        <Flex direction="row" gap={8} justify="between">
          <div style={{ display: "relative", flex: 1 }}>
            <SearchIcon
              style={{
                position: "absolute",
                left: "3.5rem",
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
          <div>
            <Avatar src="/static/logo.webp" size={2} />
          </div>
        </Flex>
      </div>
    </div>
  );
}
