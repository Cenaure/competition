import { GlobalConfig } from "payload";

export const Conclusion: GlobalConfig = {
  slug: "conclusion",
  fields: [
    {
      name: "text",
      label: "Текст",
      type: "textarea",
      required: true,
    },
    { name: "quote", label: "Коротка цитата", type: "text", required: true },
  ],
};
