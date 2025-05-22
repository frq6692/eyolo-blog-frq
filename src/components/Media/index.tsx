import { Fragment } from "react";

import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";
import type { Props } from "./types";

export function Media(props: Props) {
  const { className, htmlElement = "div", resource } = props;

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video");
  const Tag = (htmlElement as any) || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  );
}
