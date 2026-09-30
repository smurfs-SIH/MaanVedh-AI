"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownResponseProps {
  content: string;
}

export default function MarkdownResponse({
  content,
}: MarkdownResponseProps) {
  // Make source references visually consistent
  const formattedContent = content.replace(
    /\[SOURCE\s+(\d+)\]/gi,
    "**[SOURCE $1]**"
  );

  return (
    <div
      className="
        text-[15px] leading-7 text-slate-700

        [&_p]:mb-4
        [&_p:last-child]:mb-0

        [&_h1]:mb-4
        [&_h1]:mt-6
        [&_h1]:text-2xl
        [&_h1]:font-bold
        [&_h1]:text-slate-900

        [&_h2]:mb-3
        [&_h2]:mt-7
        [&_h2]:text-xl
        [&_h2]:font-bold
        [&_h2]:text-slate-900

        [&_h3]:mb-2
        [&_h3]:mt-6
        [&_h3]:text-lg
        [&_h3]:font-semibold
        [&_h3]:text-slate-900

        [&_strong]:font-semibold
        [&_strong]:text-slate-900

        [&_em]:text-slate-600

        [&_ul]:my-3
        [&_ul]:list-disc
        [&_ul]:space-y-2
        [&_ul]:pl-6

        [&_ol]:my-3
        [&_ol]:list-decimal
        [&_ol]:space-y-2
        [&_ol]:pl-6

        [&_li]:pl-1

        [&_blockquote]:my-5
        [&_blockquote]:rounded-r-lg
        [&_blockquote]:border-l-4
        [&_blockquote]:border-blue-500
        [&_blockquote]:bg-blue-50
        [&_blockquote]:px-5
        [&_blockquote]:py-3
        [&_blockquote]:text-slate-700

        [&_hr]:my-6
        [&_hr]:border-slate-200

        [&_code]:rounded
        [&_code]:bg-slate-100
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:font-mono
        [&_code]:text-sm
        [&_code]:text-blue-700

        [&_pre]:my-5
        [&_pre]:overflow-x-auto
        [&_pre]:rounded-xl
        [&_pre]:bg-slate-950
        [&_pre]:p-5
        [&_pre]:text-slate-100

        [&_a]:font-medium
        [&_a]:text-blue-600
        [&_a]:underline
        [&_a]:underline-offset-2
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
}