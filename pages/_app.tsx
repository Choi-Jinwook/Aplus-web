import { RecoilRoot } from "recoil";
import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ModalProvider from "@shared/components/Modal";
import "pretendard/dist/web/static/pretendard.css";

function MyApp({ Component, pageProps }: AppProps) {
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
          <Component {...pageProps} />
        </ModalProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
