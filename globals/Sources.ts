import { GlobalConfig } from "payload";

export const Sources: GlobalConfig = {
  slug: "sources",
  fields: [
    {
      name: "links",
      label: "Джерела",
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
  ],
};
