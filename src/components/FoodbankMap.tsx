// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { MapPin, Users, Heart } from "lucide-react";

// interface Foodbank {
//   id: number;
//   name: string;
//   location: string;
//   familiesServed: number;
//   supporters: number;
//   urgent: boolean;
//   coordinates: [number, number]; // [lng, lat]
// }

// const foodbanks: Foodbank[] = [
//   {
//     id: 1,
//     name: "Community Hope Kitchen",
//     location: "Downtown District",
//     familiesServed: 150,
//     supporters: 23,
//     urgent: true,
//     coordinates: [-74.006, 40.7128] // NYC coordinates as example
//   },
//   {
//     id: 2,
//     name: "Riverside Food Pantry",
//     location: "Riverside Neighborhood", 
//     familiesServed: 89,
//     supporters: 18,
//     urgent: false,
//     coordinates: [-74.010, 40.7200]
//   },
//   {
//     id: 3,
//     name: "St. Mary's Community Center",
//     location: "West End",
//     familiesServed: 200,
//     supporters: 34,
//     urgent: true,
//     coordinates: [-73.995, 40.7050]
//   }
// ];

// const FoodbankMap = () => {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<mapboxgl.Map | null>(null);
//   const [mapboxToken, setMapboxToken] = useState('');
//   const [isMapInitialized, setIsMapInitialized] = useState(false);

//   const initializeMap = () => {
//     if (!mapContainer.current || !mapboxToken.trim()) return;

//     mapboxgl.accessToken = mapboxToken.trim();
    
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/light-v11',
//       center: [-74.006, 40.7128], // Center on NYC as example
//       zoom: 12
//     });

//     // Add navigation controls
//     map.current.addControl(
//       new mapboxgl.NavigationControl(),
//       'top-right'
//     );

//     // Add markers for each food bank
//     foodbanks.forEach((foodbank) => {
//       const marker = new mapboxgl.Marker({
//         color: foodbank.urgent ? '#ef4444' : '#22c55e'
//       })
//         .setLngLat(foodbank.coordinates)
//         .addTo(map.current!);

//       // Create popup content
//       const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
//         <div class="p-3">
//           <h3 class="font-semibold text-lg mb-2">${foodbank.name}</h3>
//           <p class="text-sm text-gray-600 mb-2">${foodbank.location}</p>
//           <div class="flex items-center gap-4 text-sm">
//             <div class="flex items-center gap-1">
//               <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zm-6 7a4 4 0 00-8 0v3h8v-3z"/>
//               </svg>
//               ${foodbank.familiesServed} families
//             </div>
//             <div class="flex items-center gap-1">
//               <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                 <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
//               </svg>
//               ${foodbank.supporters} supporters
//             </div>
//           </div>
//           ${foodbank.urgent ? '<div class="mt-2 text-xs text-red-600 font-semibold">URGENT NEED</div>' : ''}
//         </div>
//       `);

//       marker.setPopup(popup);
//     });

//     setIsMapInitialized(true);
//   };

//   useEffect(() => {
//     return () => {
//       map.current?.remove();
//     };
//   }, []);

//   return (
//     <section className="py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-foreground mb-4">
//             Find Nearby Food Banks
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Discover food banks in your area and see their current needs and impact.
//           </p>
//         </div>

//         {!isMapInitialized && (
//           <Card className="p-6 mb-8 max-w-md mx-auto">
//             <h3 className="text-lg font-semibold mb-4">Setup Required</h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Enter your Mapbox public token to view the interactive map. Get yours at{' '}
//               <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
//                 mapbox.com
//               </a>
//             </p>
//             <div className="flex gap-2">
//               <Input
//                 type="text"
//                 placeholder="Enter Mapbox public token..."
//                 value={mapboxToken}
//                 onChange={(e) => setMapboxToken(e.target.value)}
//                 className="flex-1"
//               />
//               <Button onClick={initializeMap} disabled={!mapboxToken.trim()}>
//                 Load Map
//               </Button>
//             </div>
//           </Card>
//         )}

//         <div className="relative">
//           <div 
//             ref={mapContainer} 
//             className="w-full h-96 rounded-lg shadow-card"
//             style={{ display: isMapInitialized ? 'block' : 'none' }}
//           />
          
//           {!isMapInitialized && (
//             <div className="w-full h-96 rounded-lg bg-muted flex items-center justify-center">
//               <div className="text-center">
//                 <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-muted-foreground">Interactive map will appear here</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Legend */}
//         <div className="flex items-center justify-center gap-6 mt-6">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-red-500 rounded-full"></div>
//             <span className="text-sm text-muted-foreground">Urgent Need</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-green-500 rounded-full"></div>
//             <span className="text-sm text-muted-foreground">Regular Need</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FoodbankMap;

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
