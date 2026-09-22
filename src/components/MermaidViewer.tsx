import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidViewerProps {
  chart: string;
}

export const MermaidViewer: React.FC<MermaidViewerProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    });

    const renderChart = async () => {
      try {
        setError(null);
        if (containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          setSvgContent(svg);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to render diagram');
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="my-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 flex justify-center items-center">
      {error ? (
        <div className="text-red-400 text-sm">Error rendering diagram: {error}</div>
      ) : (
        <div 
          ref={containerRef}
          className="mermaid-diagram w-full flex justify-center text-slate-300"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
};
