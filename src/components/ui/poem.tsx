import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PoemProps {
  lines?: string[];
  className?: string;
}

const defaultPoem = [
  "In code we trust, a digital verse,",
  "Lines of logic, for better or worse.",
  "Bugs and features, a dance so fine,",
  "In this poem, our craft we define.",
  "",
  "Algorithms hum, a silent song,",
  "In loops and functions, we belong.",
  "From simple scripts to complex schemes,",
  "We build the future, byte by byte dreams.",
];

export const Poem: React.FC<PoemProps> = ({
  lines = defaultPoem,
  className = "",
}) => {
  return (
    <Card className={`font-serif text-center ${className}`}>
      <CardHeader>
        <CardTitle>A poem for you...</CardTitle>
      </CardHeader>
      <CardContent>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line.trim() === "" ? <br /> : <p className="my-1">{line}</p>}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
