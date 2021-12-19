import { EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider, ColorModeProvider } from "context";
import Layout from "layouts";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useRef } from "react";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const queryClientRef: React.MutableRefObject<any> = useRef();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  console.log(router.pathname.split("/").includes("login" && "register"));

  return (
    <ColorModeProvider>
      <Head>
        <title>panel</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <CookiesProvider>
          <QueryClientProvider client={queryClientRef.current}>
            <CssBaseline />
            {pageProps.statusCode !== 404 &&
            pageProps.statusCode !== 500 &&
            !router.pathname.split("/").includes("login" && "register") ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
            <ReactQueryDevtools />
          </QueryClientProvider>
        </CookiesProvider>
      </AuthProvider>
    </ColorModeProvider>
  );
}
