import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: "name",
      type: "text",
      label: "Ім'я",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: "Картинка профілю",
      defaultValue: "67bd9236f7ecb76ea8b1c1ef",
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Адміністратор", value: "admin" },
        { label: "Користувач", value: "user" },
      ],
      defaultValue: "user",
      required: true,
    },
  ],
};
