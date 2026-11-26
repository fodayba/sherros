import { GoogleGenAI } from '@google/genai';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

export interface StyleAdviceResult {
  text: string;
  recommendedProducts: Product[];
}

export async function askStylist(
  userQuery: string,
  currentProduct?: Product,
  chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<StyleAdviceResult> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
    
    // Provide catalog context to Gemini
    const catalogSummary = INITIAL_PRODUCTS.map(p => 
      `[ID: ${p.id}] ${p.name} (${p.category}, $${p.price}) - ${p.description.slice(0, 100)}...`
    ).join('\n');

    const systemInstruction = `You are "Sherro Style Bot", the chic, energetic, and trendsetting senior fashion stylist at "4 SHERROS", an ASOS-caliber fashion destination.
Tone: Trendy, knowledgeable, confident, British/London high-street slang mix (e.g., "vibes", "statement piece", "effortless", "drip", "fit check", "elevated").
Give concise, inspiring fashion advice (2 to 4 sentences).
Recommend 1 to 3 items specifically from the catalog below by including their ID in double square brackets, for example [[fs-01]] or [[fs-03]].

CATALOG:
${catalogSummary}

${currentProduct ? `The customer is currently looking at product: "${currentProduct.name}" (ID: ${currentProduct.id}, $${currentProduct.price}).` : ''}
`;

    const contents = [
      ...chatHistory,
      {
        role: 'user',
        parts: [{ text: userQuery }]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.85,
      }
    });

    const replyText = response.text || "You'll look incredible! Pair oversized silhouettes with sleek chunky footwear for the signature 4 SHERROS aesthetic.";
    
    // Extract [[fs-XX]] IDs
    const matchedIds: string[] = [];
    const regex = /\[\[(fs-\d+)\]\]/g;
    let match;
    while ((match = regex.exec(replyText)) !== null) {
      if (!matchedIds.includes(match[1])) {
        matchedIds.push(match[1]);
      }
    }

    const cleanText = replyText.replace(/\[\[(fs-\d+)\]\]/g, '$1');
    const recommended = INITIAL_PRODUCTS.filter(p => matchedIds.includes(p.id));

    return {
      text: cleanText,
      recommendedProducts: recommended.length > 0 ? recommended : [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[2]]
    };
  } catch (error) {
    console.error('Gemini Stylist error:', error);
    return {
      text: "The 4 SHERROS styling rule of thumb: balance proportion! Pair wide-leg parachute utility bottoms with an oversized heavyweight hoodie or sculpted crop top, grounded by heavy lug boots.",
      recommendedProducts: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1], INITIAL_PRODUCTS[2]]
    };
  }
}
