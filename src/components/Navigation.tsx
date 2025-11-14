// FILE: src/components/Navigation.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2, User, LogOut, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/store/store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Dashboard', icon: Trophy },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <Code2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CodeLearn
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2"
              activeClassName="text-primary font-semibold"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="font-semibold">{currentUser.xp} XP</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/onboarding">Get Started</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-lg py-2 text-foreground/70 hover:text-foreground transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
              {currentUser && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center gap-2 text-lg py-2">
                      <Trophy className="w-5 h-5 text-accent" />
                      <span className="font-semibold">{currentUser.xp} XP</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="justify-start gap-2 text-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
