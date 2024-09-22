import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XIcon, Linkedin, ThumbsUp, ThumbsDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProfileProps {
  name: string;
  avatarUrl: string;
  xUrl?: string;
  linkedinUrl?: string;
  compatibilityScore: number;
}

export const Profile: React.FC<ProfileProps> = ({
  name,
  avatarUrl,
  xUrl,
  linkedinUrl,
  compatibilityScore,
}) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = (type: 'positive' | 'negative' | null) => {
    setFeedback(type);
  };

  const getFeedbackBorderClass = () => {
    if (feedback === 'positive') return 'border-green-500';
    if (feedback === 'negative') return 'border-red-500';
    return 'border-white';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Card className={`w-full max-w-sm border-2 ${getFeedbackBorderClass()}`}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                {xUrl && (
                  <Button variant="outlineX" size="icon" asChild>
                    <a href={xUrl} target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 1200 1227"
                        fill="none"
                        className="hover:fill-black"
                      >
                        <path
                          d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </Button>
                )}
                {linkedinUrl && (
                  <Button variant="outlineLinkedin" size="icon" asChild>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
              <div className="text-sm font-medium">
                Compatibility: {compatibilityScore}%
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex space-x-2 p-2">
          <Button size="sm" variant="ghost" onClick={() => handleFeedback('positive')}>
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleFeedback('negative')}>
            <ThumbsDown className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleFeedback(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
