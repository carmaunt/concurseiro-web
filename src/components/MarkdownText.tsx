"use client";

import { Fragment, type ReactNode } from "react";

type Props = {
  text?: string | null;
};

function renderInlineMarkdown(text: string) {
  const nodes: Array<string | ReactNode> = [];
  const pattern = /(\*\*[\s\S]+?\*\*|\*[\s\S]+?\*|__[\s\S]+?__|_[\s\S]+?_)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const isBold = token.startsWith("**") || token.startsWith("__");
    const content = token.slice(isBold ? 2 : 1, isBold ? -2 : -1);
    nodes.push(isBold ? <strong key={`${match.index}-bold`}>{content}</strong> : <em key={`${match.index}-italic`}>{content}</em>);
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function MarkdownText({ text }: Props) {
  if (!text) return null;

  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 16)}`}>
          {renderInlineMarkdown(paragraph).map((node, nodeIndex) => (
            <Fragment key={nodeIndex}>{node}</Fragment>
          ))}
        </p>
      ))}
    </>
  );
}
