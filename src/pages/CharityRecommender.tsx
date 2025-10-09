import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CharityRecommendation {
  organisation_number: string;
  charity_name: string;
  charity_activities: string;
}

// Vite style:
const API_BASE =
  import.meta.env.VITE_RECOMMENDER_URL ??
  "http://localhost:8000"; // fallback for local dev

const CharityRecommender = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<CharityRecommendation[]>([]);
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    if (!searchQuery?.trim()) {
      toast({
        title: "Say something to search 🙂",
        description: "Try describing the cause or type of charity you want.",
      });
      return;
    }

    toast({
      title: "Searching for charities...",
      description: "Talking to the recommender…",
    });

    const res = await fetch(`${API_BASE}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({ searchQuery }), // <-- adjust key name if your FastAPI expects something else
      credentials: "include", // safe default if you later use cookies/sessions
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Recommender error (${res.status}): ${text || res.statusText}`);
    }

    // Be defensive about the shape the backend returns:
    // - Either an array directly
    // - Or { recommendations: [...] }
    const payload = await res.json();
    const items: any[] = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.recommendations)
      ? payload.recommendations
      : [];

    const normalized: CharityRecommendation[] = items.map((it) => ({
      organisation_number: String(it.organisation_number ?? it.org_number ?? it.id ?? ""),
      charity_name: String(it.charity_name ?? it.name ?? "Unknown charity"),
      charity_activities: String(it.charity_activities ?? it.activities ?? it.description ?? ""),
    }));

    if (!normalized.length) {
      toast({
        title: "No matches found",
        description: "Try a broader description or different keywords.",
      });
    }

    setResults(normalized);
  } catch (error: any) {
    const aborted = error?.name === "AbortError";
    toast({
      title: aborted ? "Request timed out" : "Search failed",
      description: aborted
        ? "The recommender took too long. Please try again."
        : (error?.message ?? "Please try again later"),
      variant: "destructive",
    });
  } finally {
    clearTimeout(timeout);
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
                  placeholder="e.g., I want to help feed families struggling with food insecurity..."
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
