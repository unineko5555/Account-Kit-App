"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
  useSmartAccountClient,
  useSendUserOperation
} from "@account-kit/react";
import { useEffect, useState } from "react";
import { encodeFunctionData, parseAbi } from "viem";

const contractAddr = "0xa67ebe2E7c404f2a5C3AD1B57d4Dff5F05535338"

const contractABI = parseAbi([
  "function battle(uint256 tokenId) external",
  "function wins(uint256 tokenId) external view returns (uint256)",
]);

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  const[wins, setWins] = useState(0);

  const { client, address } = useSmartAccountClient({
    type: "LightAccount",
  });

  const { sendUserOperationAsync } = useSendUserOperation({
    client
  });

  async function battle() {
    const res = await sendUserOperationAsync({
      uo: {
        target: contractAddr,
        data: encodeFunctionData({
          abi: contractABI,
          functionName: "battle",
          args: [BigInt(0)],
        }),
      }
    });
    console.log(res);
  }

  useEffect(() => {
    (async() => {
      if (!client) return;

      const wins = await client.readContract({
        address: contractAddr,
        abi: contractABI,
        functionName: "wins",
        args: [BigInt(0)],
      })

      // console.log(wins);
      setWins(Number(wins));
    })(); //useEffect内で非同期処理を使用する場合、直接useEffectのコールバック関数をasyncにすることはできません。これは、useEffectのコールバック関数がPromiseを返すことを想定していないためです
  },[client])

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <h2>Wins {wins}</h2>
          Logged in as {address ?? "anon"}.
          <button className="btn btn-primary mt-6" onClick={() => battle()}>
            Battle
          </button>
          <button className="btn btn-primary mt-6" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}
