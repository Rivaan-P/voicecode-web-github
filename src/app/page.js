import Image from "next/image";
import ChatDialog from "@/components/DialogChat";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div class="app-container">
      <Navbar />
      <ChatDialog />
    </div>
  );
}
