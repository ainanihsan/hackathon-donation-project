import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface Foodbank {
  id: number;
  name: string;
  location: string;
  familiesServed: number;
  supporters: number;
}

const foodbanks: Foodbank[] = [
  {
    id: 1,
    name: "Community Hope Kitchen",
    location: "Downtown District",
    familiesServed: 150,
    supporters: 23,
  },
  {
    id: 2,
    name: "Riverside Food Pantry",
    location: "Riverside Neighborhood",
    familiesServed: 89,
    supporters: 18,
  },
  {
    id: 3,
    name: "St. Mary's Community Center",
    location: "West End",
    familiesServed: 200,
    supporters: 34,
  },
];

const FoodbankMap = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFoodbanks = foodbanks.filter(
    (fb) =>
      fb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFindNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        window.open(
          `https://www.google.com/maps/search/food+bank/@${latitude},${longitude},13z`,
          "_blank"
        );
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Find Nearby Food Banks
          </h2>
        
        </div>
        {/* Search & Filter */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover food banks in your area and see their impact in the
            community.
          </p>
        <div className="flex justify-center items-center py-8">
          <Button onClick={handleFindNearMe} className="w-auto px-6 py-3">
            <MapPin className="w-4 h-4 mr-2" /> Find Near Me
          </Button>
        </div>

        {/* Google Maps Embed */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1whGneCENIKZwLkBcUF2TVG5RNertRno&ehbc=2E312F"
            className="w-full min-h-[70vh] rounded-2xl border-0"
            allowFullScreen
            loading="lazy"
            title="Interactive map showing local food banks"
            aria-label="Google Map displaying nearby food banks"
          ></iframe>

          {/* Floating Help Tip */}
          <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg text-sm shadow-md">
            🗺️ Click pins on the map for more info
          </div>
        </div>

        {/* Food Bank List */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoodbanks.length > 0 ? (
            filteredFoodbanks.map((fb) => (
              <Card key={fb.id} className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{fb.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {fb.location}
                  </p>
                  <div className="text-sm text-gray-600 mb-3">
                    🍽️ {fb.familiesServed} families served <br />
                    💚 {fb.supporters} supporters
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    fb.name + " " + fb.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline text-sm font-medium mt-2"
                >
                  View on Google Maps
                </a>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full">
              No food banks found for your search.
            </p>
          )}
        </div>

        {/* Footer Card */}
        <Card className="mt-12 text-center p-6">
          <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">
            Explore the map above or use search to find food banks near you.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default FoodbankMap;
