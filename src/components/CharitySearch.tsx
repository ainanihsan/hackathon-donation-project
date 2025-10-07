import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Search, Heart } from "lucide-react";
import { toast } from "sonner";

interface Charity {
  organisation_number: string;
  charity_name: string;
  charity_activities: string;
}

const CharitySearch = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Charity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('recommender', {
        body: { search: search.trim() }
      });

      if (error) throw error;

      setResults(data.results || []);
      if (!data.results || data.results.length === 0) {
        toast.info("No charities found. Try a different search term.");
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Failed to search charities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Find Your Perfect Match</h2>
          <p className="text-muted-foreground">
            Discover charities that align with your values and interests
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          <Input
            placeholder="e.g., charities for veterans, animal welfare, education..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="bg-gradient-trust hover:shadow-trust transition-all duration-300"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? "Searching..." : "Find Match"}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((charity) => (
              <Card key={charity.organisation_number} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{charity.charity_name}</CardTitle>
                      <CardDescription className="text-sm">
                        Org #{charity.organisation_number}
                      </CardDescription>
                    </div>
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{charity.charity_activities}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CharitySearch;
