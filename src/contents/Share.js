import Flex from "@/components/layouts/Flex";
import {
  FacebookIcon,
  Link2Icon,
  MaskXIcon,
  MessengersIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

function ShareButton({ icon, name }) {
  return (
    <button
      type="button"
      style={{ height: "5rem", width: "5rem" }}
      className="normalButton iconButton invertButton ghostButton"
    >
      <Flex direction="column" gap={1}>
        <div>{icon}</div>
        <h5 style={{ fontWeight: 500, fontSize: "0.8rem" }}>{name}</h5>
      </Flex>
    </button>
  );
}

export default function Share() {
  const iconStyle = { height: "2rem", width: "2rem" };
  return (
    <div
      style={{
        width: "20rem",
        paddingInline: "0.4rem",
        paddingBlock: "0.6rem",
      }}
    >
      <p
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          fontSize: "0.75rem",
        }}
      >
        分享
      </p>

      <Flex direction="row" gap={4} style={{ flexWrap: "wrap" }}>
        <ShareButton icon={<Link2Icon style={iconStyle} />} name="复制链接" />
        <ShareButton
          icon={<WhatsAppIcon style={iconStyle} />}
          name="WhatsApp"
        />
        <ShareButton
          icon={<MessengersIcon style={iconStyle} />}
          name="Messengers"
        />
        <ShareButton
          icon={<FacebookIcon style={iconStyle} />}
          name="Facebook"
        />
        <ShareButton icon={<MaskXIcon style={iconStyle} />} name="X" />
      </Flex>
    </div>
  );
}
