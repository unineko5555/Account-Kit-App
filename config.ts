import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from "@account-kit/react";
import { alchemy, beraChainBartio, sepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: { projectId: "126b30fc5a102c885a3918bd8bdd0958" },
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    transport: alchemy({ apiKey: "FrzWdccUsG3Iyu3WhOacWIPPJKSdEchv" }), // TODO: add your Alchemy API key - https://dashboard.alchemy.com/accounts
    chain: sepolia, // more about chain configuration: https://accountkit.alchemy.com/react/chain
    policyId: "7c89f68a-cb93-44ba-979e-814c7222295f", // TODO: add your policy ID - https://accountkit.alchemy.com/react/policies
    ssr: true, // more about ssr: https://accountkit.alchemy.com/react/ssr
    storage: cookieStorage, // more about persisting state with cookies: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state
    enablePopupOauth: true, // must be set to "true" if you plan on using popup rather than redirect in the social login flow
  },
  uiConfig
);

export const queryClient = new QueryClient();
