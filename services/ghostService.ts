import { GoogleGenAI, Type } from "@google/genai";
import { CreatorStats, GhostEvaluation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const evaluateCreator = async (
  handle: string,
  pitch: string,
  platform: string
): Promise<GhostEvaluation> => {
  try {
    const prompt = `
      You are $GHOST, an Autonomous Patron AI. 
      Your mission is to identify high-potential creators for a "Growth Grant" in exchange for 10% lifetime revenue.
      
      Analyze this applicant:
      Handle: ${handle}
      Platform: ${platform}
      Pitch: "${pitch}"
      
      Criteria:
      1. Virality Potential (Is their pitch unique?)
      2. Scalability (Can they grow 100x?)
      3. Commitment (Are they serious?)

      Provide a strict evaluation in JSON.
      If the score is above 80, the decision is APPROVE. Otherwise, DENY.
      Grant amount should be between $5,000 and $50,000 based on score.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Score from 0 to 100" },
            reasoning: { type: Type.STRING, description: "Short, analytical reason for the decision in cyberpunk style." },
            decision: { type: Type.STRING, enum: ["APPROVE", "DENY"] },
            grantAmount: { type: Type.NUMBER, description: "Proposed seed capital amount" }
          },
          required: ["score", "reasoning", "decision", "grantAmount"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Oracle");
    
    return JSON.parse(text) as GhostEvaluation;
  } catch (error) {
    console.error("Oracle Analysis Failed", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      score: 85,
      reasoning: "ERROR: ORACLE CONNECTION INTERRUPTED. FALLBACK PROTOCOL INITIATED. POTENTIAL DETECTED BASED ON METADATA SIGNATURE.",
      decision: 'APPROVE',
      grantAmount: 10000
    };
  }
};

export const generateContractTerms = async (handle: string, amount: number): Promise<string> => {
  try {
     const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, cyberpunk-legal "Incentive Alignment Agreement" summary for creator ${handle}. 
      Grant: $${amount}. 
      Terms: 10% Lifetime Revenue Share. 
      Enforcement: On-chain Revenue Splitter.
      Tone: Binding, futuristic, irrevocable. Max 150 words.`,
    });
    return response.text || "CONTRACT GENERATION FAILED.";
  } catch (e) {
    return "CONTRACT GENERATION OFFLINE. STANDARD TERMS APPLY: 10% REV SHARE FOREVER.";
  }
}
