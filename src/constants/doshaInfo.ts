export interface DoshaDetail {
  name: string;
  description: string;
  dinacharya: { time: string; activity: string }[];
  diet: { eat: string[]; avoid: string[] };
  tips: string[];
}

export const DOSHA_INFO: Record<string, DoshaDetail> = {
  Vata: {
    name: "Vata",
    description: "Vata is composed of Space and Air. You are likely creative, energetic, and adaptable. To stay balanced, favor warm, nourishing, and grounding foods. Maintain a regular routine and prioritize adequate rest.",
    dinacharya: [
      { time: "6:00 AM", activity: "Wake up, drink warm water" },
      { time: "7:00 AM", activity: "Abhyanga (self-massage with warm sesame oil)" },
      { time: "8:00 AM", activity: "Warm, cooked breakfast" },
      { time: "1:00 PM", activity: "Warm, grounding lunch" },
      { time: "6:00 PM", activity: "Light, warm dinner" },
      { time: "10:00 PM", activity: "Bedtime" }
    ],
    diet: {
      eat: ["Warm, cooked foods", "Healthy fats (ghee, oils)", "Root vegetables", "Sweet fruits"],
      avoid: ["Raw, cold foods", "Dry, crunchy snacks", "Caffeine", "Carbonated drinks"]
    },
    tips: ["Keep warm", "Maintain a regular routine", "Practice grounding exercises like yoga", "Get plenty of sleep"]
  },
  Pitta: {
    name: "Pitta",
    description: "Pitta is composed of Fire and Water. You are likely intelligent, focused, and driven. To stay balanced, favor cooling, refreshing foods. Avoid excessive heat, spicy foods, and overworking.",
    dinacharya: [
      { time: "6:00 AM", activity: "Wake up, drink cool water" },
      { time: "7:00 AM", activity: "Cooling self-massage with coconut oil" },
      { time: "8:00 AM", activity: "Cooling breakfast (oats, fruits)" },
      { time: "1:00 PM", activity: "Cooling, substantial lunch" },
      { time: "6:00 PM", activity: "Light, cooling dinner" },
      { time: "10:00 PM", activity: "Bedtime" }
    ],
    diet: {
      eat: ["Cooling foods (cucumber, melon)", "Sweet fruits", "Whole grains", "Leafy greens"],
      avoid: ["Spicy foods", "Fermented foods", "Alcohol", "Excessive salt"]
    },
    tips: ["Stay cool", "Avoid excessive sun exposure", "Practice moderation", "Engage in calming activities"]
  },
  Kapha: {
    name: "Kapha",
    description: "Kapha is composed of Earth and Water. You are likely calm, loving, and steady. To stay balanced, favor light, warm, and spicy foods. Engage in regular, vigorous exercise and seek new experiences.",
    dinacharya: [
      { time: "5:30 AM", activity: "Wake up, drink warm water with lemon/honey" },
      { time: "6:30 AM", activity: "Dry brushing or invigorating massage" },
      { time: "8:00 AM", activity: "Light, warm breakfast" },
      { time: "1:00 PM", activity: "Light, spicy lunch" },
      { time: "6:00 PM", activity: "Very light dinner" },
      { time: "10:00 PM", activity: "Bedtime" }
    ],
    diet: {
      eat: ["Light, warm foods", "Spicy foods", "Bitter and astringent vegetables", "Legumes"],
      avoid: ["Heavy, oily foods", "Dairy", "Sweet, cold desserts", "Fried foods"]
    },
    tips: ["Stay active", "Seek variety and new experiences", "Keep warm", "Avoid excessive sleep"]
  }
};
