import type { CollectionConfig } from "payload";

export const Homepage: CollectionConfig = {
  slug: "homepage",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Homepage",
    },
    {
      name: "heroSection",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Velkommen til Farsund Grappling",
        },
        {
          name: "scheduleButtonText",
          type: "text",
          required: true,
          defaultValue: "Se Timeplanen",
        },
        {
          name: "memberButtonText",
          type: "text",
          required: true,
          defaultValue: "Bli Medlem",
        },
      ],
    },
    {
      name: "whyTrainWithUs",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Hvorfor Trene Med Oss?",
        },
        {
          name: "features",
          type: "array",
          required: true,
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: "icon",
              type: "text",
              required: true,
              admin: {
                description: "Use an emoji (e.g., 🥋, 👨‍👩‍👧‍👦, 🏆)",
              },
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "whatIsGrappling",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "🤼‍♂️ Hva er Grappling?",
        },
        {
          name: "content",
          type: "richText",
          required: true,
        },
        {
          name: "ctaButtonText",
          type: "text",
          required: true,
          defaultValue: "Start i Dag",
        },
      ],
    },
    {
      name: "newsSection",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Siste Nytt",
        },
        {
          name: "viewAllText",
          type: "text",
          required: true,
          defaultValue: "Se Alle",
        },
        {
          name: "readMoreText",
          type: "text",
          required: true,
          defaultValue: "Les Mer",
        },
      ],
    },
  ],
};
