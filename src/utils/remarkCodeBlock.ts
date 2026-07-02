import type { Root } from "mdast";

interface MdastNode {
  type: string;
  children?: MdastNode[];
  value?: string;
  lang?: string;
}

export function remarkCodeBlock() {
  return (tree: Root) => {
    const children = tree.children as MdastNode[];
    const result: MdastNode[] = [];

    let i = 0;
    while (i < children.length) {
      const node = children[i];
      const text = nodeToText(node);

      if (text.includes("[code]") || text.includes("[/code]")) {
        const fullText = collectTextFromRange(children, i, (n) => {
          const t = nodeToText(n);
          return t.includes("[/code]");
        });

        const codeMatch = fullText.match(
          /\[code\]\s*\n?([\s\S]*?)\[\/code\]/
        );
        if (codeMatch) {
          const code = codeMatch[1]
            .replace(/^[ \t]{4}/gm, "")
            .replace(/\n{3,}/g, "\n\n")
            .trim();

          if (code) {
            result.push({
              type: "code",
              lang: undefined,
              value: code,
            } as MdastNode);
          }

          const endIdx = findEndIndex(children, i, (n) =>
            nodeToText(n).includes("[/code]")
          );
          i = endIdx + 1;
          continue;
        }
      }

      result.push(node);
      i++;
    }

    tree.children = result as any;
  };
}

function nodeToText(node: MdastNode): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return node.value ?? "";
  }
  if (node.type === "code") {
    return node.value ?? "";
  }
  if (node.children) {
    return node.children.map(nodeToText).join("");
  }
  return "";
}

function collectTextFromRange(
  children: MdastNode[],
  start: number,
  endFn: (node: MdastNode) => boolean
): string {
  const parts: string[] = [];
  for (let j = start; j < children.length; j++) {
    const node = children[j];
    parts.push(nodeToText(node));
    if (endFn(node)) break;
  }
  return parts.join("\n");
}

function findEndIndex(
  children: MdastNode[],
  start: number,
  endFn: (node: MdastNode) => boolean
): number {
  for (let j = start; j < children.length; j++) {
    if (endFn(children[j])) return j;
  }
  return start;
}
