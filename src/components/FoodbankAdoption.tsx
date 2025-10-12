import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Heart,
  Star,
  Calendar,
  MessageCircle
} from "lucide-react";
import communityHopeKitchenImg from "@/assets/community-hope-kitchen.jpg";

const FoodbankAdoption = () => {
  const foodbanks = [
    {
      id: 1,
      name: "Community Hope Kitchen",
      location: "Downtown District",
      familiesServed: 150,
      rating: 4.9,
      urgent: true,
      needs: ["Canned Goods", "Fresh Produce", "Volunteer Hours"],
      description: "Serving families in the downtown area for over 15 years. Known for their warm community atmosphere and comprehensive support programs.",
      lastUpdate: "2 hours ago",
      supporters: 23,
      image: communityHopeKitchenImg
    },
    {
      id: 2,
      name: "Riverside Food Pantry", 
      location: "Riverside Neighborhood",
      familiesServed: 89,
      rating: 4.7,
      urgent: false,
      needs: ["Baby Formula", "Diapers", "School Supplies"],
      description: "Focuses on supporting young families and children. Provides not just food but educational resources and childcare support.",
      lastUpdate: "5 hours ago", 
      supporters: 18,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "St. Mary's Community Center",
      location: "West End",
      familiesServed: 200,
      rating: 4.8,
      urgent: true,
      needs: ["Winter Clothing", "Hot Meals", "Blankets"],
      description: "The largest food bank in our network, serving diverse communities with culturally appropriate foods and multilingual support.",
      lastUpdate: "1 day ago",
      supporters: 34,
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Adopt a Food Bank
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Form a personal connection with a local food bank. Receive updates, photos, and messages from the community you're supporting.
          </p>
        </div>

        {/* Food bank cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {foodbanks.map((foodbank) => (
            <Card key={foodbank.id} className="overflow-hidden shadow-card hover:shadow-trust transition-all duration-300 bg-card/90 backdrop-blur-sm">
              {/* Food bank image */}
              <div className="relative">
                {typeof foodbank.image === 'string' ? (
                  <div className="h-48 bg-gradient-transparency" />
                ) : (
                  <img 
                    src={foodbank.image} 
                    alt={foodbank.name}
                    className="h-48 w-full object-cover"
                  />
                )}
                {foodbank.urgent && (
                  <Badge className="absolute top-4 right-4 bg-impact text-impact-foreground">
                    Urgent Need
                  </Badge>
                )}
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {foodbank.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {foodbank.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-impact" />
                      {foodbank.rating}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-2xl font-bold">{foodbank.familiesServed}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Families/Month</span>
                  </div>
                  <div className="text-center p-3 bg-secondary/5 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-2xl font-bold">{foodbank.supporters}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Supporters</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {foodbank.description}
                </p>

                {/* Current needs */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-card-foreground mb-2">
                    Current Needs:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {foodbank.needs.map((need, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Last update */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  Last update: {foodbank.lastUpdate}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-trust hover:shadow-trust transition-all duration-300">
                    <Heart className="w-4 h-4 mr-2" />
                    Adopt This Food Bank
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Updates
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Card className="inline-block p-8 bg-card/80 backdrop-blur-sm shadow-impact">
            <h3 className="text-2xl font-semibold text-card-foreground mb-4">
              Can't decide which food bank to adopt?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Let our algorithm match you with a food bank based on your preferences and giving history.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-impact/30 hover:bg-impact/5"
              onClick={() => window.location.href = '/find-charity'}
            >
              Find My Perfect Match
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FoodbankAdoption;