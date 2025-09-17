import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  TrendingUp, 
  MapPin, 
  Clock,
  CheckCircle,
  Truck,
  Heart
} from "lucide-react";

const ImpactDashboard = () => {
  const recentDonations = [
    {
      id: "TXN-2024-0001",
      amount: 50,
      status: "delivered",
      location: "Community Food Bank - Downtown",
      families: 12,
      date: "2 hours ago",
      progress: 100
    },
    {
      id: "TXN-2024-0002", 
      amount: 75,
      status: "in-transit",
      location: "Hope Kitchen - Riverside",
      families: 18,
      date: "5 hours ago",
      progress: 65
    },
    {
      id: "TXN-2024-0003",
      amount: 25,
      status: "processing",
      location: "St. Mary's Pantry",
      families: 6,
      date: "1 day ago",
      progress: 30
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in-transit":
        return <Truck className="w-4 h-4 text-primary" />;
      default:
        return <Package className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success/10 text-success border-success/20";
      case "in-transit":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Impact Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time tracking of your donations and their journey to families in need
          </p>
        </div>

        {/* Impact metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-gradient-trust shadow-trust border-0">
            <div className="flex items-center justify-between text-primary-foreground">
              <div>
                <p className="text-sm opacity-90">Total Donated</p>
                <p className="text-3xl font-bold">$2,450</p>
              </div>
              <Heart className="w-8 h-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 shadow-card border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Families Fed</p>
                <p className="text-3xl font-bold text-foreground">128</p>
              </div>
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card border-impact/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Donations</p>
                <p className="text-3xl font-bold text-foreground">7</p>
              </div>
              <Package className="w-8 h-8 text-impact" />
            </div>
          </Card>

          <Card className="p-6 shadow-card border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold text-foreground">98%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </Card>
        </div>

        {/* Recent donations tracking */}
        <Card className="p-8 shadow-card">
          <h3 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            Recent Donation Tracking
          </h3>

          <div className="space-y-6">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="border border-border rounded-lg p-6 hover:shadow-card transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(donation.status)}
                    <div>
                      <p className="font-semibold text-foreground">
                        ${donation.amount} Donation
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {donation.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:ml-auto">
                    <Badge className={getStatusColor(donation.status)}>
                      {donation.status.replace("-", " ")}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {donation.date}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {donation.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {donation.families} families impacted
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{donation.progress}%</span>
                  </div>
                  <Progress value={donation.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ImpactDashboard;