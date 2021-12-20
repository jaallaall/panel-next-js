import { Section } from "@mui";
import type { NextPage } from "next";
import Helmet from "./Helmet";

const AuthLayout: React.FC = ({ children }): React.ReactElement => {
  return (
    <Helmet>
      <Section
        sx={{
          py: 10,
          flex: "auto",
          justifyContent: "center",
          backgroundImage: "url(/images/auth-bg.png)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundColor: "rgba(0,0,0,0.04)",
        }}
      >
        {children}
      </Section>
    </Helmet>
  );
};

export function getAuthLayout(page: NextPage) {
  return <AuthLayout>{page}</AuthLayout>;
}
