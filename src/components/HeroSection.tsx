import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Eye, Heart, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-hero py-20 px-4"
      style={{
        backgroundImage: `url(${heroBackground}), linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))`,
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundBlendMode: 'overlay, normal'
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-transparency opacity-50" />
      
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 bg-card border border-primary/20 rounded-full px-4 py-2 mb-8 shadow-card">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Transparent Impact Tracking
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          See Your
          <span className="bg-gradient-trust bg-clip-text text-transparent"> Impact</span>
          <br />
          In Real-Time
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Every donation tracked from warehouse to impact. Connect directly with food pantries and watch your generosity create lasting change.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gradient-trust hover:shadow-trust transition-all duration-300 border-0 text-lg px-8 py-6">
            Start Giving Transparently
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/5 text-lg px-8 py-6">
            View Live Dashboard
          </Button>
        </div>

        {/* Charity Recommender CTA Card */}
        <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-primary/30 shadow-trust mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Looking to donate? Try out our charity recommender to find your perfect match
            </h3>
            <p className="text-muted-foreground mb-6">
              Let our algorithm match you with a food bank based on your preferences and giving history.
            </p>
            <Button asChild size="lg" className="bg-gradient-trust hover:shadow-trust transition-all duration-300 text-lg px-8 py-4">
              <a href="/find-charity">
                <Eye className="w-5 h-5 mr-2" />
                Find My Perfect Match
              </a>
            </Button>
          </div>
        </Card>

        {/* Impact preview cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/10 shadow-card hover:shadow-trust transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-impact flex items-center justify-center">
                <Heart className="w-5 h-5 text-impact-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground">Direct Impact</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              See exactly which families received food and how their lives improved
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-secondary/10 shadow-card hover:shadow-trust transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Eye className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground">Full Traceability</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Track your donation through every step of the supply chain
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-success/10 shadow-card hover:shadow-trust transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground">Measurable Results</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Receive updates and photos showing real outcomes from your generosity
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;