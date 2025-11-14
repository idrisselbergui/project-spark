// FILE: src/components/LessonCard.tsx
import { Link } from 'react-router-dom';
import { Clock, Award, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lesson } from '@/data/mockLessons';
import { useLesson } from '@/store/store';

interface LessonCardProps {
  lesson: Lesson;
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success hover:bg-success/20',
  intermediate: 'bg-accent/10 text-accent hover:bg-accent/20',
  advanced: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
};

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const { progress } = useLesson();
  const isCompleted = progress[lesson.id]?.completed;
  const hintsUsed = progress[lesson.id]?.hintsUsed || 0;

  return (
    <Link to={`/lesson/${lesson.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/50 relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10">
            <CheckCircle2 className="w-6 h-6 text-success fill-success/20" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between mb-2">
            <Badge className={difficultyColors[lesson.difficulty]}>
              {lesson.difficulty}
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              {lesson.skill}
            </Badge>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {lesson.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {lesson.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{lesson.estimatedTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-accent" />
              <span className="font-semibold text-foreground">{lesson.xp} XP</span>
            </div>
          </div>
          
          {isCompleted && hintsUsed > 0 && (
            <div className="mt-3 text-xs text-muted-foreground">
              Completed with {hintsUsed} hint{hintsUsed !== 1 ? 's' : ''}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
