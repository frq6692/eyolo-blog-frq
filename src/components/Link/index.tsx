// import { Button, type ButtonProps } from "@/components/ui/button";
// import { cn } from "@/utilities/ui";
// import { Link as i18nLink } from "@/i18n/routing";
import Link from "next/link";
import React from "react";

type CMSLinkType = {
  appearance?: "inline" | "block";
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  type?: "custom" | "reference" | null;
  url?: string | null;
};

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { children, className, label, newTab, url } = props;

  const href = url;

  if (!href) return null;

  const finalHref = href || url || "";

  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Link className={className} href={finalHref} {...newTabProps}>
      {label && label}
      {children && children}
    </Link>
  );
};
