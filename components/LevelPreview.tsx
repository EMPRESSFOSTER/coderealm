"use client";

import { useEffect, useRef } from "react";

interface LevelPreviewProps {
  html: string;
  css: string;
  js: string;
}

export default function LevelPreview({ html, css, js }: LevelPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const updatePreview = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const document = iframe.contentDocument;
      if (!document) return;

      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 20px; font-family: sans-serif; background: white; min-height: 100vh; }
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (err) {
                console.error('JS Error:', err.message);
              }
            </script>
          </body>
        </html>
      `;

      document.open();
      document.write(content);
      document.close();
    };

    const timeout = setTimeout(updatePreview, 500);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden border border-brand-cyan/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="h-8 bg-slate-100 border-b flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white h-5 rounded border px-2 text-[10px] text-slate-400 flex items-center">
          localhost:3000/preview
        </div>
      </div>
      <iframe
        ref={iframeRef}
        title="preview"
        className="w-full h-[calc(100%-32px)] border-none"
      />
    </div>
  );
}
