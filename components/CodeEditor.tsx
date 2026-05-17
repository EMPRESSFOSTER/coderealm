"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useEffect, useRef } from "react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
  theme?: "vs-dark" | "light";
}

export default function CodeEditor({
  language,
  value,
  onChange,
  theme = "vs-dark",
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Customizing Monaco theme to fit our cyberpunk aesthetic
    monaco.editor.defineTheme("code-realm-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6272a4" },
        { token: "keyword", foreground: "ff79c6" },
        { token: "identifier", foreground: "50fa7b" },
        { token: "string", foreground: "f1fa8c" },
        { token: "type", foreground: "8be9fd" },
      ],
      colors: {
        "editor.background": "#0a0a0f",
        "editor.lineHighlightBackground": "#ffffff10",
        "editorCursor.foreground": "#00f3ff",
        "editorIndentGuide.activeBackground": "#00f3ff40",
        "editor.selectionBackground": "#00f3ff20",
      },
    });

    monaco.editor.setTheme("code-realm-dark");
  };

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-brand-cyan/20 glass-panel">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: "var(--font-geist-mono)",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
}
