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
    {
      name: "overlayOpacity",
      type: "number",
      required: true,
      defaultValue: 0.7,
      min: 0,
      max: 1,
      admin: {
        description:
          "Opacity of the overlay (0 = transparent, 1 = fully opaque)",
        step: 0.1,
      },
    },
    {
      name: "overlayColor",
      type: "text",
      required: true,
      defaultValue: "#000000",
      admin: {
        description: "Hex color code for overlay (e.g., #000000 for black)",
      },
    },
  ],
};
