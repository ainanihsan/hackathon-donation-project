import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Wallet,
  Package,
  Truck,
  MapPin,
  Users,
  CheckCircle2,
  Clock
} from "lucide-react";

const DonationFlow = () => {
  const flowSteps = [
    {
      step: 1,
      title: "Donation Initiated",
      description: "Your $50 donation processed",
      icon: Wallet,
      status: "completed",
      timestamp: "Today, 2:30 PM",
      details: "Payment confirmed via secure gateway"
    },
    {
      step: 2,
      title: "Procurement Started",
      description: "Food items being sourced",
      icon: Package,
      status: "completed", 
      timestamp: "Today, 3:15 PM",
      details: "Partner supplier: Fresh Valley Foods"
    },
    {
      step: 3,
      title: "In Transit",
      description: "En route to Community Hope Kitchen",
      icon: Truck,
      status: "active",
      timestamp: "Today, 4:20 PM",
      details: "Estimated delivery: Today, 6:00 PM"
    },
    {
      step: 4,
      title: "Delivered",
      description: "Food distributed to families",
      icon: MapPin,
      status: "pending",
      timestamp: "Pending",
      details: "Awaiting confirmation from food bank"
    },
    {
      step: 5,
      title: "Impact Report",
      description: "Photos and updates from recipients",
      icon: Users,
      status: "pending",
      timestamp: "Expected tomorrow",
      details: "Community coordinator will share results"
    }
  ];

  const getStepStatus = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-success/10",
          border: "border-success/30",
          icon: "text-success",
          badge: "bg-success text-success-foreground"
        };
      case "active":
        return {
          bg: "bg-primary/10",
          border: "border-primary/30", 
          icon: "text-primary",
          badge: "bg-primary text-primary-foreground"
        };
      default:
        return {
          bg: "bg-muted/50",
          border: "border-muted",
          icon: "text-muted-foreground",
          badge: "bg-muted text-muted-foreground"
        };
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Track Your Donation Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow your $50 donation as it transforms into meals for families in need. Every step is tracked and verified.
          </p>
        </div>

        {/* Donation metadata */}
        <Card className="p-6 mb-8 shadow-card bg-gradient-transparency">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Donation #TXN-2024-0004
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-semibold text-foreground">$50.00</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected Impact:</span>
                  <p className="font-semibold text-foreground">12 Families</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Food Bank:</span>
                  <p className="font-semibold text-foreground">Community Hope</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    In Progress
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Flow visualization */}
        <div className="space-y-6">
          {flowSteps.map((step, index) => {
            const status = getStepStatus(step.status);
            const IconComponent = step.icon;
            const isLast = index === flowSteps.length - 1;

            return (
              <div key={step.step} className="relative">
                <Card className={`p-6 ${status.bg} ${status.border} border transition-all duration-300 hover:shadow-card`}>
                  <div className="flex items-start gap-4">
                    {/* Step icon */}
                    <div className={`w-12 h-12 rounded-full ${status.bg} ${status.border} border-2 flex items-center justify-center flex-shrink-0`}>
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : step.status === "active" ? (
                        <Clock className="w-6 h-6 text-primary animate-pulse" />
                      ) : (
                        <IconComponent className={`w-6 h-6 ${status.icon}`} />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-card-foreground">
                          Step {step.step}: {step.title}
                        </h3>
                        <Badge className={`text-xs ${status.badge}`}>
                          {step.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                        <span className="text-foreground font-medium">
                          {step.timestamp}
                        </span>
                        <span className="text-muted-foreground">
                          • {step.details}
                        </span>
                      </div>
                    </div>

                    {/* Step number badge */}
                    <div className="text-right">
                      <div className={`w-8 h-8 rounded-full ${status.badge} flex items-center justify-center text-sm font-bold`}>
                        {step.step}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Connecting line */}
                {!isLast && (
                  <div className="flex justify-start ml-6">
                    <div className={`w-0.5 h-6 ${step.status === "completed" ? "bg-success/30" : "bg-muted"} ml-5.5`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Expected impact preview */}
        <Card className="mt-12 p-8 bg-gradient-impact shadow-impact">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-impact-foreground mb-4">
              Expected Impact from Your $50 Donation
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-impact-foreground">
              <div>
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-sm opacity-90">Families Fed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">48</div>
                <div className="text-sm opacity-90">Meals Provided</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-sm opacity-90">Days of Nutrition</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DonationFlow;