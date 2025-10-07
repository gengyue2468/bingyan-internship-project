import {
  GitHubIcon,
  GoogleIcon,
  PinterestIcon,
  QRCodeIcon,
} from "@/components/ui/Icons";
import Flex from "@/components/layouts/Flex";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useSession, signIn, signOut } from "next-auth/react";

function Input({ ...props }) {
  return <input {...props} className="input" />;
}

function MethodButton({ method, icon, ...props }) {
  const isMobile = useDeviceType();
  return (
    <button
      type="button"
      style={{
        background: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        paddingInline: "1rem",
        paddingBlock: "0.75rem",
        width: isMobile ? "100%" : "80%",
      }}
      className="normalButton"
      {...props}
    >
      <Flex
        direction="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={2}
      >
        <span>{icon}</span>
        <span>通过 {method} 登录</span>
      </Flex>
    </button>
  );
}

export default function Login() {
  const isMobile = useDeviceType();
  const iconStyle = { width: "1.5rem", height: "1.5rem" };
  return (
    <div>
      <Flex direction="column" gap={3}>
        <PinterestIcon style={{ width: "2rem", height: "2rem" }} />
        <h2 style={{ textAlign: "center" }}>欢迎来到 Pinterest</h2>

        <form style={{ marginTop: "1rem", width: isMobile ? "100%" : "80%" }}>
          <Flex direction="column" disabledCenter gap={2}>
            <small style={{ opacity: 0.75 }}>电子邮件</small>
            <Input type="text" placeholder="电子邮件" />
            <small style={{ opacity: 0.75 }}>密码</small>
            <Input type="password" placeholder="密码" />
            <small style={{ color: "var(--success)" }}>忘记密码？</small>
            <button
              type="submit"
              style={{
                background: "var(--bingo)",
                borderRadius: "1rem",
                paddingInline: "1rem",
                paddingBlock: "0.75rem",
              }}
              className="normalButton"
              disabled
            >
              登录
            </button>
          </Flex>
        </form>
        <small
          style={{ opacity: 0.75, textAlign: "center", marginBlock: "0.5rem" }}
        >
          或
        </small>

        <MethodButton
          icon={<QRCodeIcon style={iconStyle} />}
          method="QR Code"
        />
        <MethodButton icon={<GoogleIcon style={iconStyle} />} method="Google" />
        <MethodButton
          onClick={() => signIn("github")}
          icon={<GitHubIcon style={iconStyle} />}
          method="GitHub"
        />

        <small
          style={{ textAlign: "center", opacity: 0.8, marginTop: "0.5rem" }}
        >
          很遗憾通知您，但我们做对了，您目前只能通过 GitHub 访问 Pinterest 账户.
          注册服务亦不再可用.
        </small>
        <small style={{ textAlign: "center", opacity: 0.5 }}>
          继续即表示你同意 Pinterest
          的服务条款并且确认已阅读我们的隐私政策。收藏合辑中的通知。
        </small>
      </Flex>
    </div>
  );
}
