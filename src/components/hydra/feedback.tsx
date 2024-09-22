import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedbackProps {
  onFeedback: (isPositive: boolean) => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ onFeedback }) => {
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const handleFeedback = (isPositive: boolean) => {
    setFeedback(isPositive);
    onFeedback(isPositive);
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant={feedback === true ? "default" : "outline"}
        size="sm"
        onClick={() => handleFeedback(true)}
        aria-label="Thumbs up"
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button
        variant={feedback === false ? "default" : "outline"}
        size="sm"
        onClick={() => handleFeedback(false)}
        aria-label="Thumbs down"
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
};
