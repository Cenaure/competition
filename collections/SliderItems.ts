import type { CollectionConfig } from "payload";

export const SliderItems: CollectionConfig = {
  slug: "slider-items",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "img",
      type: "text",
      required: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
  admin: {
    // ...
    livePreview: {
      url: "http://localhost:3000#colonization",
    },
  },
};
