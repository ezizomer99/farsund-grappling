import type { CollectionConfig } from "payload";

export const Instructors: CollectionConfig = {
  slug: "instructors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "beltLevel", "order"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "e.g., Hovedinstruktør, Assisterende instruktør",
      },
    },
    {
      name: "beltLevel",
      type: "text",
      required: true,
      admin: {
        description: "e.g., Lilla Belte, Brun Belte",
      },
    },
    {
      name: "profileImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "bio",
      type: "richText",
      required: true,
      admin: {
        description: "Tell us about yourself, your experience, and accolades",
      },
    },
    {
      name: "email",
      type: "email",
      required: false,
    },
    {
      name: "phone",
      type: "text",
      required: false,
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: {
        description: "Order in which instructors appear (lower numbers first)",
      },
    },
  ],
};
