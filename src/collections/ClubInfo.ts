import type { CollectionConfig } from "payload";

export const ClubInfo: CollectionConfig = {
  slug: "club-info",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Farsund Grappling",
    },
    {
      name: "story",
      type: "richText",
      required: true,
      admin: {
        description: "Tell the story of the club",
      },
    },
    {
      name: "mission",
      type: "text",
      required: false,
    },
    {
      name: "values",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        {
          name: "email",
          type: "email",
        },
        {
          name: "phone",
          type: "text",
        },
        {
          name: "address",
          type: "text",
        },
        {
          name: "socialMedia",
          type: "group",
          fields: [
            {
              name: "facebook",
              type: "text",
              admin: {
                placeholder: "https://facebook.com/...",
              },
            },
            {
              name: "instagram",
              type: "text",
              admin: {
                placeholder: "https://instagram.com/...",
              },
            },
          ],
        },
      ],
    },
    {
      name: "location",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Finn Oss",
        },
        {
          name: "mapEmbedUrl",
          type: "textarea",
          admin: {
            description: "Paste the Google Maps embed URL here",
            placeholder: "https://www.google.com/maps/embed?pb=...",
          },
        },
        {
          name: "directionsUrl",
          type: "text",
          admin: {
            description: "Link to Google Maps for directions",
            placeholder: "https://maps.google.com/?q=...",
          },
        },
        {
          name: "findUsTitle",
          type: "text",
          defaultValue: "Hvor vi trener",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "directionsText",
          type: "text",
          defaultValue: "Få veibeskrivelse",
        },
      ],
    },
  ],
};
