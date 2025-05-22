import { Media } from "@/components/Media";
import type { StaticImageData } from "next/image";
import React from "react";

export const MediaBlock: React.FC<{
  media?: any;
  staticImage?: StaticImageData;
}> = (props) => {
  const { media, staticImage } = props;

  // let caption;
  // if (media && typeof media === "object") caption = media.caption;

  return <Media resource={media} src={staticImage} />;
};
