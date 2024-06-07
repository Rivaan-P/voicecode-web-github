import { MainGemini } from "@/components/main";
import { TypewriterEffectSmoothDemo } from "@/components/mainTypeWriter";

export default function Home() {
  return (
    <div>
      <MainGemini />
      {/* <div class="app-container">
        <ChatDialog />
      </div> */}
      <TypewriterEffectSmoothDemo />
    </div>
  );
}
