import { Spinner } from "@/components/ui/spinner";
import { database } from "@/firebase";
import { google } from "@ai-sdk/google";
import { StreamingTextResponse, convertToCoreMessages, streamText } from "ai";
import { ref, set, push, update, get } from "firebase/database";
import { parseCommands, executeCommands } from './commandParser';
import path from 'path';

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
        const dbRef = ref(database, namaUnik + "/" + currentBranch);

        // Fetch the existing array
        const snapshot = await get(dbRef);
        const existingArray = snapshot.val() || { content: [] };

        const userMessage = messages.findLast((message) => message.role === "user");

        const content = [
          ...existingArray.content,
          { user: userMessage.content, ai: text },
        ];

        // Parse and execute file management commands
        const commands = parseCommands(text);
        if (commands.length > 0) {
          const initialDirectory = path.resolve(__dirname, '../../'); // Set your initial directory
          await executeCommands(commands, initialDirectory);
        }

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
