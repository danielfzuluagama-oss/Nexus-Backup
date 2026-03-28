import dotenv from "dotenv";
dotenv.config();

console.log("--- ALL GROQ KEYS IN ENV ---");
for (const [key, value] of Object.entries(process.env)) {
  if (key.includes("GROQ_API_KEY")) {
    console.log(`${key}=${value?.substring(0, 10)}...`);
  }
}
