import { FC, memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { RiFileCopyLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

const CodeBlock = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  // const downloadAsFile = () => {
  //   if (typeof window === 'undefined') {
  //     return
  //   }
  //   const fileExtension = programmingLanguages[language] || '.file'
  //   const suggestedFileName = `file-${generateRandomString(
  //     3,
  //     true
  //   )}${fileExtension}`
  //   const fileName = window.prompt('Enter file name' || '', suggestedFileName)

  //   if (!fileName) {
  //     // User pressed cancel on prompt.
  //     return
  //   }

  //   const blob = new Blob([value], { type: 'text/plain' })
  //   const url = URL.createObjectURL(blob)
  //   const link = document.createElement('a')
  //   link.download = fileName
  //   link.href = url
  //   link.style.display = 'none'
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  //   URL.revokeObjectURL(url)
  // }

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  return (
    <div className="relative w-full font-sans codeblock bg-zinc-950">
      <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          {/* <Button
              variant="ghost"
              className="hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
              onClick={downloadAsFile}
              size="icon"
            >
              <IconDownload />
              <span className="sr-only">Download</span>
            </Button> */}
          <Button
            variant="ghost"
            size="icon"
            className="text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={onCopy}
          >
            {/* {isCopied ? <IconCheck /> : <IconCopy />} */}
            {isCopied ? <FaCheck /> : <RiFileCopyLine />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: "100%",
          background: "transparent",
          padding: "1.5rem 1rem",
        }}
        lineNumberStyle={{
          userSelect: "none",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.9rem",
            fontFamily: "var(--font-mono)",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});

export default CodeBlock;
