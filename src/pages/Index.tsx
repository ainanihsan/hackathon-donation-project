import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ImpactDashboard from "@/components/ImpactDashboard";
import FoodbankAdoption from "@/components/FoodbankAdoption";
import FoodbankMap from "@/components/FoodbankMap";
import DonationFlow from "@/components/DonationFlow";
import CharitySearch from "@/components/CharitySearch";
import { Eye } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <div id="search">
          <CharitySearch />
        </div>
        <div id="dashboard">
          <ImpactDashboard />
        </div>
        <div id="adopt">
          <FoodbankAdoption />
        </div>
        <div id="map">
          <FoodbankMap />
        </div>
        <div id="tracking">
          <DonationFlow />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-gradient-trust flex items-center justify-center">
              <Eye className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">ImpactTrace</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Transparent food donation tracking for maximum impact
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
