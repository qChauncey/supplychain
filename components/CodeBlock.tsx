interface CodeBlockProps {
  code: string;
  lang: string;
}

function tokenize(code: string, lang: string): string {
  if (lang === "xml") {
    return code
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/(&lt;\/?[\w]+)/g, '<span class="token-tag">$1</span>')
      .replace(/(&gt;)/g, '<span class="token-tag">$1</span>')
      .replace(/([\w:]+)=/g, '<span class="token-attr">$1</span>=')
      .replace(/("[\w\s\-/.]+")/g, '<span class="token-value">$1</span>')
      .replace(/(<!--[\s\S]*?--&gt;)/g, '<span class="token-comment">$1</span>');
  }

  if (lang === "javascript" || lang === "bash") {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="token-comment">$1</span>')
      .replace(/\b(function|const|let|var|return|if|else)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="token-string">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
  }

  return code;
}

export default function CodeBlock({ code, lang }: CodeBlockProps) {
  const highlighted = tokenize(code, lang);

  return (
    <div className="relative overflow-x-auto" style={{ background: "#080c14" }}>
      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
          {lang}
        </span>
      </div>
      <pre className="p-5 overflow-x-auto leading-7 text-xs"
        dangerouslySetInnerHTML={{ __html: highlighted }}
        style={{ color: "var(--text-secondary)", margin: 0 }}
      />
    </div>
  );
}
