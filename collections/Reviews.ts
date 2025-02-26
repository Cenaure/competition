import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
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
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
  ],
};
