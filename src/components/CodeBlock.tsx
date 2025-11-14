// FILE: src/components/CodeBlock.tsx
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  readOnly?: boolean;
}

export const CodeBlock = ({ code, language = 'javascript', readOnly = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 z-10">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="bg-secondary rounded-lg p-4 overflow-x-auto border-2 border-border">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
      {!readOnly && (
        <div className="mt-1 text-xs text-muted-foreground">
          Language: {language}
        </div>
      )}
    </div>
  );
};
