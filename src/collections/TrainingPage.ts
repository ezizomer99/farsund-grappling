import type { CollectionConfig } from "payload";

export const TrainingPage: CollectionConfig = {
  slug: "training-page",
  admin: {
    useAsTitle: "title",
    description:
      "Manage the Training page content including general information",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Treningskalender",
      admin: {
        description: "Page title displayed at the top",
      },
    },
    {
      name: "generalInfo",
      type: "group",
      label: "Generell Informasjon",
      admin: {
        description: "General information section displayed below the schedule",
      },
      fields: [
        {
          name: "sectionTitle",
          type: "text",
          required: true,
          defaultValue: "Generell informasjon",
          label: "Section Title",
        },
        {
          name: "whatToBring",
          type: "group",
          label: "Hva bør du ta med?",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              defaultValue: "Hva bør du ta med?",
            },
            {
              name: "items",
              type: "array",
              required: true,
              minRows: 1,
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: "hygiene",
          type: "group",
          label: "Hygiene",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              defaultValue: "Hygiene:",
            },
            {
              name: "intro",
              type: "textarea",
              required: false,
              defaultValue:
                "Minner alle om at dette er en nærkontakt sport hvor god hygiene er viktig:",
              admin: {
                description: "Introductory text before the list",
              },
            },
            {
              name: "items",
              type: "array",
              required: true,
              minRows: 1,
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: "environment",
          type: "group",
          label: "Miljø",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              defaultValue: "Miljø:",
            },
            {
              name: "content",
              type: "textarea",
              required: true,
              defaultValue:
                "Dette skal være et trygt miljø, der alle skal behandle hverandre med respekt og skal ta hensyn til hverandres sikkerhet. Dette området vil vi ha høyt fokus på fremover.",
            },
          ],
        },
      ],
    },
    {
      name: "trainingPrograms",
      type: "relationship",
      relationTo: "training-programs",
      hasMany: true,
      admin: {
        description:
          "Select which training programs to display on this page (leave empty to show all active programs)",
      },
    },
  ],
};
