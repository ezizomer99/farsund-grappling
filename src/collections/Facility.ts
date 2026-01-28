import type { CollectionConfig } from "payload";

export const Facility: CollectionConfig = {
  slug: "facility",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Våre Fasiliteter",
    },
    {
      name: "trainingArea",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Moderne Treningsarena",
        },
        {
          name: "subtitle",
          type: "text",
          defaultValue: "Vi holder til på Løft Gym i Farsund",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
    },
    {
      name: "opportunities",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Hva Vi Tilbyr",
        },
        {
          name: "description",
          type: "richText",
          required: true,
        },
      ],
    },
  ],
};
