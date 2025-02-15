import React, { ReactNode, useState } from "react";

interface TextExpanderProps {
  children: string;
  collapsedNumWords?: number;
  className?: string;
  collapseButtonText?: string;
  expanded?: boolean;
  expandButtonText?: string;
  buttonColor?: string;
}

function getFirstNOfWords(text: string, numOfWords: number) {
  return text.split(" ").slice(0, numOfWords).join(" ") + "...";
}

function TextExpander({
  children,
  collapsedNumWords = 10,
  className = "",
  collapseButtonText = "Show Less...",
  expanded = false,
  expandButtonText = "Show More...",
  buttonColor = "#0000ff",
}: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const buttonStyle = {
    color: `${buttonColor}`,
    background: "none",
    border: "none",
    cursor: "pointer",
    marginLeft: "6px",
    font: "inherit",
  };

  return (
    <div className={className}>
      <span>
        {isExpanded ? children : getFirstNOfWords(children, collapsedNumWords)}
      </span>
      <button style={buttonStyle} onClick={() => setIsExpanded((exp) => !exp)}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

export default TextExpander;
