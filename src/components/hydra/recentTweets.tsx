import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Tweet {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    handle: string;
    avatarUrl: string;
  };
}

interface RecentTweetsProps {
  tweets: Tweet[];
}

export const RecentTweets: React.FC<RecentTweetsProps> = ({ tweets }) => {
  const handleCardClick = (handle: string) => {
    window.open(`https://twitter.com/${handle}`, '_blank');
  };

  const defaultAvatarUrl = "https://pbs.twimg.com/profile_images/1569835396527456257/wVf2FVO0_400x400.jpg";

  return (
    <div className="space-y-4">
      {tweets.slice(0, 3).map((tweet) => (
        <Card 
          key={tweet.id} 
          className="w-full cursor-pointer hover:bg-gray-900 transition-colors duration-200"
          onClick={() => handleCardClick(tweet.author.handle)}
        >
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={defaultAvatarUrl} alt={tweet.author.name} />
              <AvatarFallback>{tweet.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <CardTitle className="text-sm font-medium">{tweet.author.name}</CardTitle>
              <p className="text-sm text-gray-500">{tweet.author.handle}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{tweet.content}</p>
            <p className="text-xs text-gray-500 mt-2">{new Date(tweet.createdAt).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
