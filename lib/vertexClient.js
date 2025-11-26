// lib/vertexClient.js
import { VertexAI } from "@google-cloud/vertexai";

const project = process.env.GCP_PROJECT_ID;
const location = "asia-northeast1"; // 東京近辺。us-central1 でもOK

if (!project) {
  throw new Error("GCP_PROJECT_ID is not set");
}

const vertexAI = new VertexAI({
  project,
  location,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    // Vercelの環境変数では \n がエスケープされているので戻す
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

// モデルIDはあとで環境変数から変えられるようにする
const modelId = process.env.GEMINI_MODEL_ID || "gemini-3.0-flash"; // 最新系の軽量モデル例1

export const geminiModel = vertexAI.getGenerativeModel({
  model: modelId,
});
