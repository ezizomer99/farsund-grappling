import type { CollectionConfig } from "payload";

export const Background: CollectionConfig = {
  slug: "background",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Background Settings",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        description: "Background image for the entire site",
      },
    },
  ],
};
