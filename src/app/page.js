import { MainGemini } from "@/components/mainPage/mainGemini";
import { TypewriterEffectSmoothDemo } from "@/components/mainPage/mainTypeWriter";

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
