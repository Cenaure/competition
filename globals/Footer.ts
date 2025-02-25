import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "copyright",
      label: "Авторські права",
      type: "text",
      required: true,
    },
    {
      name: "links",
      label: "Мапа сайта",
      type: "array",
      fields: [
        {
          name: "label",
          label: "Назва посилання",
          type: "text",
          required: true,
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "socials",
      label: "Соціальні мережі",
      type: "array",
      fields: [
        {
          name: "platform",
          label: "Іконка",
          relationTo: "media",
          type: "relationship",
        },
        {
          name: "url",
          label: "URL",
          type: "text",
        },
      ],
    },
  ],
};
