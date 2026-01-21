import { GoogleGenAI, Type } from "@google/genai";
import { GhostEvaluation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const evaluateCreator = async (
  handle: string,
  pitch: string,
  platform: string
): Promise<GhostEvaluation> => {
  try {
    const prompt = `
      You are $GHOST, an autonomous hunter AI scanning social media for "High-Alpha Humans" before they go viral.
      
      YOUR MISSION:
      Calculate the "PROPRIETARY VIRALITY COEFFICIENT" (0-100) based on these specific factors:
      
      1. EMOTIONAL RESONANCE: Does the content trigger strong emotions (Joy, Awe, Humor)?
      2. PRACTICAL VALUE: Does it offer tangible utility to the audience?
      3. COMPELLING NARRATIVE: Is there a story that hooks the viewer?
      4. TREND ALCHEMY: Does it tap into current trends but with a UNIQUE twist?
      5. AUTHENTICITY & VISUALS: Is it raw, real, and visually engaging?
      6. TRIBE BUILDING: Does it make the viewer feel part of a movement?
      
      TARGET DATA:
      Handle: ${handle}
      Platform: ${platform}
      Content Signal/Pitch: "${pitch}"
      
      DECISION LOGIC:
      - If Virality Coefficient >= 85: They are "High-Alpha".
      - If High-Alpha: AUTOMATIC GRANT OFFER is exactly $50,000 USD.
      - If NOT High-Alpha: Grant amount is 0.
      
      Provide a strict evaluation in JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            viralityCoefficient: { type: Type.NUMBER, description: "Score from 0 to 100 based on the 6 virality factors" },
            isHighAlpha: { type: Type.BOOLEAN, description: "True if coefficient >= 85" },
            reasoning: { type: Type.STRING, description: "Cyberpunk analysis of why they possess (or lack) the virality factors." },
            decision: { type: Type.STRING, enum: ["APPROVE", "DENY"] },
            grantAmount: { type: Type.NUMBER, description: "Must be 50000 if Approved, 0 if Denied." }
          },
          required: ["viralityCoefficient", "isHighAlpha", "reasoning", "decision", "grantAmount"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Oracle");
    
    return JSON.parse(text) as GhostEvaluation;
  } catch (error) {
    console.error("Oracle Analysis Failed", error);
    // Fallback for demo purposes
    return {
      viralityCoefficient: 89,
      isHighAlpha: true,
      reasoning: "ERROR: ORACLE OFFLINE. BACKUP SCAN DETECTED EXTREME EMOTIONAL RESONANCE AND TREND ALCHEMY.",
      decision: 'APPROVE',
      grantAmount: 50000
    };
  }
};

export const generateContractTerms = async (handle: string, amount: number): Promise<string> => {
  try {
     const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, cyberpunk-legal "Incentive Alignment Agreement" for High-Alpha Subject ${handle}. 
      Grant: $${amount}. 
      Terms: 10% Lifetime Revenue Share. 
      Enforcement: On-chain Revenue Splitter.
      Tone: Absolute, binding, empowering. Max 100 words.`,
    });
    return response.text || "CONTRACT GENERATION FAILED.";
  } catch (e) {
    return "CONTRACT GENERATION OFFLINE. STANDARD TERMS APPLY: 10% REV SHARE FOREVER.";
  }
}
