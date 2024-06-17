import { Spinner } from "@/components/ui/spinner";
import { database } from "@/firebase";
import { google } from "@ai-sdk/google";
import { StreamingTextResponse, convertToCoreMessages, streamText } from "ai";
import { ref, set, push, update, get } from "firebase/database";

export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const namaUnik = req.headers.get("kodeunik");
    const currentBranch = req.headers.get("currentbranch");

    const result = await streamText({
      model: google("models/gemini-1.5-flash"),
      messages: convertToCoreMessages(messages),
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        // console.log([...messages, { role: "assistant", content: text }]);

        const dbRef = ref(database, namaUnik + "/" + currentBranch);

        // Fetch the existing array
        const snapshot = await get(dbRef);
        console.log("snapshot", snapshot);
        const existingArray = snapshot.val() || []; // If no data exists, start with an empty array
        console.log("existingArray", existingArray);

        // Modify the array locally by adding a new item
        // const newItem = { user: "newUser" };
        // const updatedArray = [...existingArray, newItem];

        const userMessage = messages.findLast(
          (message) => message.role === "user"
        );

        const content = [
          ...existingArray.content,
          { user: userMessage.content, ai: text },
        ];

        console.log("content", content);
        // console.log("content", content);

        // const outputArray = processContent(content);
        // console.log("outputObject", outputArray);

        // Add new messages to the database
        await update(dbRef, { index: currentBranch, content: content });
        console.log("Stored messages in Firebase Realtime Database");
      },
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
