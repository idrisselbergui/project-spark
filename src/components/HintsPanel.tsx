// FILE: src/components/HintsPanel.tsx
import { useState } from 'react';
import { Lightbulb, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Hint {
  level: number;
  text: string;
}

interface HintsPanelProps {
  hints: Hint[];
  onHintReveal: (level: number) => void;
  currentHintsUsed: number;
}

export const HintsPanel = ({ hints, onHintReveal, currentHintsUsed }: HintsPanelProps) => {
  const [revealedLevels, setRevealedLevels] = useState<number[]>([]);

  const handleReveal = (level: number) => {
    if (!revealedLevels.includes(level)) {
      setRevealedLevels([...revealedLevels, level]);
      onHintReveal(level);
    }
  };

  return (
    <Card className="p-4 bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Hints</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentHintsUsed} hint{currentHintsUsed !== 1 ? 's' : ''} used
        </div>
      </div>

      <div className="space-y-3">
        {hints.map((hint) => {
          const isRevealed = revealedLevels.includes(hint.level);
          const canReveal = hint.level === 1 || revealedLevels.includes(hint.level - 1);

          return (
            <div key={hint.level}>
              {isRevealed ? (
                <Alert className="bg-accent/10 border-accent/30">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <AlertDescription className="text-sm">
                    <strong>Hint {hint.level}:</strong> {hint.text}
                  </AlertDescription>
                </Alert>
              ) : (
                <Button
                  onClick={() => handleReveal(hint.level)}
                  disabled={!canReveal}
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  {canReveal ? (
                    <>
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Reveal Hint {hint.level}
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Hint {hint.level} (Reveal previous hint first)
                    </>
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {currentHintsUsed > 0 && (
        <div className="mt-4 text-xs text-muted-foreground">
          Note: Using hints will reduce your final score
        </div>
      )}
    </Card>
  );
};
