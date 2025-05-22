import { authenticated } from "@/access/authenticated";
import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },

  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "occupation",
      type: "text",
    },
    ...slugField("name"),
  ],
  timestamps: true,
};
