import { FC } from "react";
import useCanvasWallet from "./CanvasWalletProvider";
import UserProfile from "./UserProfile"; // Ensure the correct path to UserProfile
import { Main1 } from "./Main1"; // Import Main1 component

const WalletComponent = () => {
  const { connectWallet, walletAddress, walletIcon, userInfo, content, signTransaction } =
    useCanvasWallet();

  return (
    <div>
      <button onClick={connectWallet}>Connect Solana Wallet</button>

      {walletAddress && (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <img src={walletIcon || ""} alt="Wallet Icon" />
        </div>
      )}

      {userInfo && (
        <div>
          <p>Username: {userInfo.username}</p>
          {userInfo.avatar && <img src={userInfo.avatar} alt="User Avatar" />}
          {userInfo.username && <UserProfile username={userInfo.username} />}
        </div>
      )}

      {content && (
        <div>
          <p>Portal Name: {content.portalName}</p>
        </div>
      )}

      {/* Pass the walletAddress and signTransaction to Main1 */}
      {walletAddress && signTransaction && (
        <Main1 walletAddress={walletAddress} signTransaction={signTransaction} />
      )}
    </div>
  );
};

export default WalletComponent;
