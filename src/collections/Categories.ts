import type { CollectionConfig } from "payload";

import { slugField } from "@/fields/slug";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "image"],
  },
  fields: [
    ...slugField(),
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
