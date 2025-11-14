// FILE: src/pages/Profile.tsx
import { Award, Trophy, Flame, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth, useLesson } from '@/store/store';
import { mockLessons } from '@/data/mockLessons';

const Profile = () => {
  const { currentUser } = useAuth();
  const { progress } = useLesson();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Please complete onboarding first</p>
        </Card>
      </div>
    );
  }

  const completedLessons = Object.values(progress).filter((p) => p.completed).length;
  const totalLessons = mockLessons.length;

  // Calculate skill progress
  const skillProgress = mockLessons.reduce((acc, lesson) => {
    const isCompleted = progress[lesson.id]?.completed;
    if (!acc[lesson.skill]) {
      acc[lesson.skill] = { completed: 0, total: 0 };
    }
    acc[lesson.skill].total++;
    if (isCompleted) {
      acc[lesson.skill].completed++;
    }
    return acc;
  }, {} as Record<string, { completed: number; total: number }>);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Track your learning progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-2xl font-bold">{currentUser.xp}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="text-2xl font-bold">{currentUser.level}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-success/10">
                  <Target className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">
                    {completedLessons}/{totalLessons}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-destructive/10">
                  <Flame className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold">{currentUser.streak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar
              current={completedLessons}
              total={totalLessons}
              label="Lessons Completed"
            />
          </CardContent>
        </Card>

        {/* Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(skillProgress).map(([skill, data]) => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{skill}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {data.completed}/{data.total} lessons
                  </span>
                </div>
                <ProgressBar
                  current={data.completed}
                  total={data.total}
                  showPercentage={false}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
