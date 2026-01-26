import type { CollectionConfig } from "payload";

export const TrainingPrograms: CollectionConfig = {
  slug: "training-programs",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "level", "ageGroup", "isActive", "order"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "level",
      type: "select",
      required: true,
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
        { label: "All Levels", value: "all" },
      ],
    },
    {
      name: "ageGroup",
      type: "select",
      required: true,
      options: [
        { label: "Kids", value: "kids" },
        { label: "Teens", value: "teens" },
        { label: "Adults", value: "adults" },
        { label: "All Ages", value: "all" },
      ],
    },
    {
      name: "schedule",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "day",
          type: "select",
          required: true,
          options: [
            { label: "Mandag", value: "Mandag" },
            { label: "Tirsdag", value: "Tirsdag" },
            { label: "Onsdag", value: "Onsdag" },
            { label: "Torsdag", value: "Torsdag" },
            { label: "Fredag", value: "Fredag" },
            { label: "Lørdag", value: "Lørdag" },
            { label: "Søndag", value: "Søndag" },
          ],
        },
        {
          name: "startTime",
          type: "text",
          required: true,
          admin: {
            placeholder: "18:00",
          },
        },
        {
          name: "endTime",
          type: "text",
          required: true,
          admin: {
            placeholder: "19:30",
          },
        },
        {
          name: "instructor",
          type: "relationship",
          relationTo: "instructors",
          required: false,
        },
      ],
    },
    {
      name: "isActive",
      type: "checkbox",
      required: true,
      defaultValue: true,
      admin: {
        description: "Uncheck to hide this program from the schedule",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: {
        description: "Display order (lower numbers first)",
      },
    },
  ],
};
