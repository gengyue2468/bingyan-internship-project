import Avatar from "./Avatar";
import Flex from "../layouts/Flex";
import { DotsIcon, HeartIcon } from "./Icons";
import DropDown from "./Dropdown";
import moment from "moment";

export default function CommentCard({
  username,
  nickname,
  avatar,
  content,
  date,
  ...props
}) {
  moment.locale("zh-cn");
  return (
    <Flex
      {...props}
      direction="column"
      gap={4}
      disabledCenter
      style={{
        width: "100%",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        paddingBlock: "1rem",
        padding: "1rem"
      }}
    >
      <Flex direction="row" gap={4}>
        <Avatar src={avatar} size={2} />
        <Flex direction="column" disabledCenter={true}>
          <h4>{nickname}</h4>
          <h5 style={{ opacity: 0.75 }}>@{username}</h5>
        </Flex>
      </Flex>
      <div>
        <main>{content}</main>
        <Flex direction="row" gap={2} style={{ marginTop: "0.5rem" }}>
          <h5>{moment(date).fromNow()}</h5>
          <h5>回复</h5>
          <button
            className="normalButton iconButton ghostButton"
            style={{ width: "1.5rem", height: "1.5rem", padding: 0 }}
          >
            <HeartIcon style={{ height: "1rem" }} />
          </button>
          <DropDown
            customTop="2rem"
            className="normalButton iconButton ghostButton"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              padding: 0,
            }}
            menu={
              <Flex
                direction="column"
                gap={2}
                disabledCenter
                style={{ width: "7rem" }}
              >
                <button
                  type="button"
                  className="normalButton ghostButton"
                  style={{
                    paddingInline: "0.75rem",
                    paddingBlock: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  举报此内容
                </button>
                <button
                  type="button"
                  className="normalButton ghostButton"
                  style={{
                    paddingInline: "0.75rem",
                    paddingBlock: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  屏蔽用户
                </button>
              </Flex>
            }
            center
          >
            <DotsIcon style={{ height: "1rem" }} />
          </DropDown>
        </Flex>
      </div>
    </Flex>
  );
}
