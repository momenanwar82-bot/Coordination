import { Type } from "@google/genai";

export function getGeminiApiKey(): string | null {
  return localStorage.getItem('GEMINI_API_KEY');
}

export function setGeminiApiKey(key: string) {
  if (key) {
    localStorage.setItem('GEMINI_API_KEY', key.trim());
  } else {
    localStorage.removeItem('GEMINI_API_KEY');
  }
}

export function hasGeminiApiKey(): boolean {
  const key = getGeminiApiKey();
  return !!(key && key.trim().length > 10);
}

export interface CallGeminiParams {
  model?: string;
  systemInstruction?: string;
  contents: any;
  responseMimeType?: string;
  responseSchema?: any;
}

export async function callGeminiDirectly({
  model = "gemini-3.5-flash",
  systemInstruction,
  contents,
  responseMimeType,
  responseSchema,
}: CallGeminiParams): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("يرجى إدخال مفتاح Gemini API في أعلى الموقع لتشغيل خدمات الذكاء الاصطناعي.");
  }

  // Use the standard REST API endpoint of Gemini
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Build the request body
  const body: any = {
    contents: contents,
    generationConfig: {}
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  if (responseMimeType) {
    body.generationConfig.responseMimeType = responseMimeType;
  }
  
  if (responseSchema) {
    body.generationConfig.responseSchema = responseSchema;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData?.error?.message || response.statusText || "خطأ غير معروف في الاتصال بـ Gemini API";
    throw new Error(`خطأ في نموذج Gemini: ${errMsg}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error("لم يتم استرجاع إجابة صحيحة من نموذج الذكاء الاصطناعي. يرجى مراجعة صلاحية مفتاح الـ API.");
  }

  return text;
}
