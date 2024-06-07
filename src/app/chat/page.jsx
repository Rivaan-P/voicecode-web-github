import { Resizable } from "@/components/Resizable";
import React from "react";

// import { getTokens } from "next-firebase-auth-edge";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
// import { clientConfig, serverConfig } from "@/config";

export const metadata = {
  title: "Chat",
};

export default async function Chat() {
  // for api coockies
  // const tokens = await getTokens(cookies(), {
  //   apiKey: clientConfig.apiKey,
  //   cookieName: serverConfig.cookieName,
  //   cookieSignatureKeys: serverConfig.cookieSignatureKeys,
  //   serviceAccount: serverConfig.serviceAccount,
  // });

  // if (!tokens) {
  //   notFound();
  // }

  return <Resizable />;
}
