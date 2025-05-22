import { slugify } from "@/libs/utils/slugify";
import Link from "next/link";
// import CustomImage from "@/components/blog/CustomImage";
// import CustomVideo from "@/components/blog/CustomVideo";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MDXcomponents = {
  Link,
  // CustomImage,
  // CustomVideo,
  h2: (props: { children: string }) => (
    <Link className="no-underline" href={`#${slugify(props.children)}`}>
      <h2 className="heading" id={slugify(props.children)} {...props} />
    </Link>
  ),
  h3: (props: { children: string }) => (
    <Link className="no-underline" href={`#${slugify(props.children)}`}>
      <h3 className="heading" id={slugify(props.children)} {...props} />
    </Link>
  ),
  // pre: (props: { children: { props: { className: string; children: string } } }) => (
  //   <SyntaxHighlighter
  //     language={props.children.props.className.split("-")[1]}
  //     style={dracula}
  //     className="rounded-lg !p-6 !pl-3"
  //     showLineNumbers
  //   >
  //     {props.children.props.children}
  //   </SyntaxHighlighter>
  // ),
  code: (props: { children: string }) => (
    <code
      className="bg-[#282a36] text-[#f1fa8c] rounded px-2 py-1 text-sm"
      {...props}
    ></code>
  ),
};

export default MDXcomponents;
