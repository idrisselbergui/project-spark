// FILE: src/pages/LessonPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Award, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CodeBlock } from '@/components/CodeBlock';
import { HintsPanel } from '@/components/HintsPanel';
import { mockLessons, Lesson } from '@/data/mockLessons';
import { useLesson, useAuth } from '@/store/store';
import { toast } from 'sonner';

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { progress, setCurrentLesson, completeLesson, addHintUsage } = useLesson();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    if (id) {
      const found = mockLessons.find((l) => l.id === id);
      if (found) {
        setLesson(found);
        setCurrentLesson(id);
        setUserCode(found.challenge.starterCode);
        // Load hints used from progress
        const savedHints = progress[id]?.hintsUsed || 0;
        setHintsUsed(savedHints);
      }
    }
  }, [id, setCurrentLesson, progress]);

  const handleRunTests = () => {
    if (!lesson) return;

    // Mock test execution
    const results = lesson.challenge.tests.map((test, index) => ({
      passed: Math.random() > 0.3, // 70% pass rate for demo
      message: test.description,
    }));

    setTestResults(results);

    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      toast.success('All tests passed! 🎉');
    } else {
      toast.error('Some tests failed. Keep trying!');
    }
  };

  const handleComplete = () => {
    if (!lesson || !id) return;

    const earnedXP = Math.max(lesson.xp - hintsUsed * 10, lesson.xp * 0.5);
    completeLesson(id, hintsUsed, earnedXP);

    toast.success(`Lesson completed! Earned ${earnedXP} XP`, {
      description: hintsUsed > 0 ? `Used ${hintsUsed} hints` : 'Perfect score!',
    });

    setTimeout(() => navigate('/'), 2000);
  };

  const handleHintReveal = () => {
    if (!id) return;
    setHintsUsed((prev) => prev + 1);
    addHintUsage(id);
    toast.info('Hint revealed', {
      description: 'Your final score will be slightly reduced',
    });
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lesson not found</h2>
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const isCompleted = progress[lesson.id]?.completed;
  const potentialXP = Math.max(lesson.xp - hintsUsed * 10, lesson.xp * 0.5);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge>{lesson.difficulty}</Badge>
                <Badge variant="secondary">{lesson.skill}</Badge>
                {isCompleted && (
                  <Badge className="bg-success/10 text-success">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>

            <Card className="p-4 min-w-[200px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Potential XP</span>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="font-bold">{Math.round(potentialXP)}</span>
                  </div>
                </div>
                <Progress value={(potentialXP / lesson.xp) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {hintsUsed > 0 && `${hintsUsed} hints used`}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Content & Example */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Content */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Content</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }} />
              </CardContent>
            </Card>

            {/* Code Example */}
            <Card>
              <CardHeader>
                <CardTitle>Code Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={lesson.codeExample} readOnly />
              </CardContent>
            </Card>

            {/* Challenge */}
            <Card className="border-2 border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{lesson.challenge.description}</p>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Your Code</label>
                    <Button
                      size="sm"
                      onClick={handleRunTests}
                      className="gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Run Tests
                    </Button>
                  </div>
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="font-mono text-sm min-h-[200px]"
                    placeholder="Write your code here..."
                  />
                </div>

                {/* Test Results */}
                {testResults.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Test Results:</h4>
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                          result.passed
                            ? 'bg-success/10 border-success/30'
                            : 'bg-destructive/10 border-destructive/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {result.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          ) : (
                            <span className="w-4 h-4 text-destructive">✕</span>
                          )}
                          <span className="text-sm">{result.message}</span>
                        </div>
                      </div>
                    ))}

                    {testResults.every((r) => r.passed) && !isCompleted && (
                      <Button
                        onClick={handleComplete}
                        className="w-full mt-4"
                        size="lg"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Hints */}
          <div className="space-y-6">
            <HintsPanel
              hints={lesson.hints}
              onHintReveal={handleHintReveal}
              currentHintsUsed={hintsUsed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
