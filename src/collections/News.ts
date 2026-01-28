import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedAt", "status"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "URL-friendly version of the title (e.g., velkommen-til-farsund-grappling)",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: {
        description: "Brief summary shown on news listing page",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
  ],
};
