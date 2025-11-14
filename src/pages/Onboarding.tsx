// FILE: src/pages/Onboarding.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/store/store';
import { toast } from 'sonner';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setSession } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    // Create mock user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      xp: 0,
      level: 1,
      streak: 0,
    };

    setCurrentUser(newUser);
    setSession(`session_${Date.now()}`);

    toast.success(`Welcome aboard, ${name}! 🚀`);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Code2 className="w-12 h-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl">Welcome to CodeLearn</CardTitle>
          <CardDescription className="text-base">
            Start your coding journey with interactive lessons and real-time feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full gap-2" size="lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-2">What you'll get:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Interactive coding challenges
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Progressive hint system
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Track your progress and earn XP
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Learn at your own pace
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
