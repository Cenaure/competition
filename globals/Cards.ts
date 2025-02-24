import { GlobalConfig } from "payload";

export const Cards: GlobalConfig = {
  slug: "cards",
  fields: [
    {
      name: "items",
      label: "Картки",
      type: "array",
      required: true,
      maxRows: 4,
      fields: [
        {
          label: "Заголовок",
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "shortText",
          type: "textarea",
          required: true,
          label: "Короткий текст",
        },
        {
          name: "fullText",
          type: "textarea",
          required: true,
          label: "Розширений текст",
        },
        {
          name: "imgUrl",
          type: "relationship",
          required: true,
          label: "Посилання на картинку",
          relationTo: "media",
        },
      ],
    },
  ],
};
