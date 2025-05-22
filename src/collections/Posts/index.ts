import type { CollectionConfig } from "payload";

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { MediaBlock } from "../../blocks/MediaBlock/config";

import { slugField } from "@/fields/slug";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { revalidatePost } from "./hooks/revalidatePost";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "updatedAt"],
    // livePreview: {
    //   url: ({ data, locale }) => {
    //     const path = generatePreviewPath({
    //       slug: typeof data?.slug === "string" ? data.slug : "",
    //       collection: "posts",
    //       locale: locale.code,
    //     });

    //     return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
    //   },
    // },
    // preview: (data, { locale }) => {
    //   const path = generatePreviewPath({
    //     slug: typeof data?.slug === "string" ? data.slug : "",
    //     collection: "posts",
    //     locale,
    //   });

    //   return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
    // },
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      // localized: true,
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "content",
              type: "richText",
              // localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    BlocksFeature({ blocks: [MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              name: "relatedPosts",
              type: "relationship",
              maxRows: 3,
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "posts",
            },
            {
              name: "category",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              hasMany: false,
              relationTo: "categories",
            },
          ],
          label: "Meta",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "readTime",
      type: "number",
      label: "Read Time",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "author",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: false,
      relationTo: "users",
    },

    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    // afterRead: [populateAuthors],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
};
