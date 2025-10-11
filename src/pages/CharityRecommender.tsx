import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CharityResult {
  organisation_number: string;
  charity_name: string;
  charity_activities: string;
}

const CharityRecommender = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<CharityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Tell us what cause you care about",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          num_recommendations: 3,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setResults(data);
        if (data.length === 0) {
          toast({
            title: "No charities found",
            description: "Try a different search term.",
          });
        }
      } else {
        setResults([]);
        toast({
          title: "Unexpected response",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setResults([]);
      let description = error?.message || "Please try again later";
      // Show a more descriptive message if the API is not accessible
      if (
        error?.name === "TypeError" &&
        (description.includes("Failed to fetch") || description.includes("NetworkError"))
      ) {
        description =
          "The recommendation service is not accessible. Please ensure the API server is running (e.g. with 'uvicorn charity_recommender.api:app --reload').";
      }
      toast({
        title: "Search failed",
        description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect Charity Match
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe what you care about in your own words, and we'll find the perfect charities for you
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                What cause matters to you?
              </CardTitle>
              <CardDescription>
                Describe in natural language what you'd like to support - just type as if you're talking to a friend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="e.g. help feed families struggling with food insecurity"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Recommended Charities
            </h2>
            {results.map((charity) => (
              <Card key={charity.organisation_number} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{charity.charity_name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        Org #: {charity.organisation_number}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      Support
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{charity.charity_activities}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!results.length && !loading && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Start Your Search
            </h3>
            <p className="text-muted-foreground">
              Enter a cause or keyword above to find charities that match your interests
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CharityRecommender;
