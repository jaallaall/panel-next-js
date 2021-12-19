import { Section } from "@mui";

function Error({ statusCode }: { statusCode: any }): JSX.Element {
  return (
    <Section
      sx={{
        alignItems: "center",
        justifyContent: "center",
        flex: "auto",
        textAlign: "center",
      }}
    >
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </Section>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
