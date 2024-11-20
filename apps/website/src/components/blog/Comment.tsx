'use client';

import * as React from 'react';
import { X, Edit2, Trash2, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui';
import { Button } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Card, CardContent, CardHeader } from '@repo/ui';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
}

export default function Component({
  onClose = () => console.log('closed'),
  onSubmit = (content: string) => console.log(content),
  currentUser = {
    name: 'Current User',
    avatar: '/placeholder.svg?height=40&width=40',
  },
}: {
  onClose?: () => void;
  onSubmit?: (content: string) => void;
  currentUser?: {
    name: string;
    avatar: string;
  };
}) {
  const [comments, setComments] = React.useState<Comment[]>([
    {
      id: '1',
      user: {
        name: 'Alexander Reed',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content:
        "Great use of metaphors to show the character's conflict. A bit more background might help clarify their motivations. Well done overall!",
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    },
    {
      id: '2',
      user: {
        name: 'Alex Supran',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content:
        "Great use of metaphors! More background could enhance understanding of the character's motivations. Nice job overall.",
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    },
    {
      id: '3',
      user: {
        name: 'Chrisopher Campbell',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content:
        "The metaphors effectively highlight the character's conflict. Adding a bit more background would help with their motivations. Well done!",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
  ]);
  const [newComment, setNewComment] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      content: newComment,
      timestamp: new Date(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment('');
    onSubmit(newComment);
  };

  const formatTimestamp = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  return (
    <Card className="w-full max-w-2xl bg-zinc-950 text-white">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Christian Buehnar" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Christian Buehnar</h2>
          <p className="text-sm text-zinc-400">3 minutes ago</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="rounded-lg bg-zinc-900 p-4">
          <p>
            Great use of metaphors to show the character&apos;s conflict. A bit more background might help clarify their
            motivations. Well done overall!
          </p>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{comment.user.name}</h3>
                    <span className="text-sm text-zinc-400">• {formatTimestamp(comment.timestamp)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-zinc-300">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="min-h-0 h-10 py-2 bg-zinc-900 border-zinc-800 text-white resize-none"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              disabled={!newComment.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
