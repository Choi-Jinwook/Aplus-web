import { RecoilEnv, RecoilRoot } from "recoil";
import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ModalProvider from "@shared/components/Modal";
import "pretendard/dist/web/static/pretendard.css";
import { Header, Navigation } from "@shared/components";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
  const { pathname } = useRouter();
  const currentPath = pathname.split("/")[2];
  const paths = ["home", "foods", "finance", "events", "chores"];

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            select: (data: any) => data.data || data,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ModalProvider>
          {pathname !== "/" && <Header />}
          <Component {...pageProps} />
          {currentPath && paths.some((path) => currentPath.includes(path)) && (
            <Navigation />
          )}
        </ModalProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
