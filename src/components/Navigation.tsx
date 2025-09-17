import { Button } from "@/components/ui/button";
import { Heart, Eye, Users, ArrowRight } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-trust flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              ImpactTrace
            </span>
          </div>

          {/* Navigation items */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#adopt" className="text-foreground hover:text-primary transition-colors">
              Adopt a Foodbank
            </a>
            <a href="#tracking" className="text-foreground hover:text-primary transition-colors">
              Track Donations
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>

          {/* CTA Button */}
          <Button className="bg-gradient-trust hover:shadow-trust transition-all duration-300">
            <Heart className="w-4 h-4 mr-2" />
            Start Giving
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;