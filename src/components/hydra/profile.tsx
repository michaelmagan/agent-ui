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
                  <Button variant="outline" size="icon" asChild>
                    <a href={xUrl} target="_blank" rel="noopener noreferrer">
                      <XIcon className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {linkedinUrl && (
                  <Button variant="outline" size="icon" asChild>
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
