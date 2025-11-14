// FILE: src/pages/Dashboard.tsx
import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { LessonCard } from '@/components/LessonCard';
import { mockLessons } from '@/data/mockLessons';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [difficultyRange, setDifficultyRange] = useState([0, 2]);

  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const allSkills = Array.from(new Set(mockLessons.map((l) => l.skill)));

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredLessons = useMemo(() => {
    return mockLessons.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkill =
        selectedSkills.length === 0 || selectedSkills.includes(lesson.skill);

      const difficultyIndex = difficulties.indexOf(lesson.difficulty);
      const matchesDifficulty =
        difficultyIndex >= difficultyRange[0] && difficultyIndex <= difficultyRange[1];

      return matchesSearch && matchesSkill && matchesDifficulty;
    });
  }, [searchQuery, selectedSkills, difficultyRange]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Master Programming Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive coding lessons with real-time feedback and progressive hints
          </p>
        </div>

        {/* Filters Section */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Skill Tags */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4" />
                Filter by Skill
              </Label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Difficulty Slider */}
            <div>
              <Label className="mb-3 block">
                Difficulty: {difficulties[difficultyRange[0]]} to {difficulties[difficultyRange[1]]}
              </Label>
              <Slider
                min={0}
                max={2}
                step={1}
                value={difficultyRange}
                onValueChange={setDifficultyRange}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredLessons.length} of {mockLessons.length} lessons
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No lessons found matching your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
