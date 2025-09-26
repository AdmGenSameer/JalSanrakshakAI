import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Home as HomeIcon,
  Lightbulb,
  BarChart3,
  Droplets,
  Info,
  Download,
  ArrowLeft,
  TrendingUp,
  Leaf,
  Calculator,
  MapPin,
  DollarSign
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Results: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  // Mock data - in real app, this would come from API
  const results = {
    annual_harvestable_water: 15000,
    recommended_structure: 'First Flush Diverter with Underground Storage Tank',
    installation_cost: 45000,
    payback_period: 4.5,
    water_savings_annual: 12000,
    cost_savings_annual: 8400,
    runoff_coefficient: 0.85,
    collection_efficiency: 0.92,
    storage_efficiency: 0.95,
    soil_type: 'Clay Loam',
    aquifer_type: 'Unconfined',
    groundwater_depth: 15,
    co2_reduction: 2.5,
    energy_savings: 8000
  };

  const downloadReport = () => {
    // Mock PDF generation
    alert('PDF report generation would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Your Rainwater Harvesting <span className="bg-gradient-water bg-clip-text text-transparent">Assessment</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive analysis and recommendations for your property
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={downloadReport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Link to="/assessment">
                <Button variant="water" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  New Assessment
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-0 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Water Harvest</p>
                    <p className="text-2xl font-bold text-primary">{results.annual_harvestable_water.toLocaleString()}L</p>
                  </div>
                  <Droplets className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Installation Cost</p>
                    <p className="text-2xl font-bold text-primary">₹{results.installation_cost.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Payback Period</p>
                    <p className="text-2xl font-bold text-primary">{results.payback_period} years</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                    <p className="text-2xl font-bold text-primary">₹{results.cost_savings_annual.toLocaleString()}</p>
                  </div>
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                Assessment
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Results
              </TabsTrigger>
              <TabsTrigger value="groundwater" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Groundwater
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                About
              </TabsTrigger>
            </TabsList>

            {/* Assessment Tab */}
            <TabsContent value="assessment" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="glass-card border-0 shadow-water">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HomeIcon className="h-5 w-5 text-primary" />
                      Water Harvesting Potential
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Annual Harvestable Water</span>
                        <span className="font-semibold text-primary">{results.annual_harvestable_water.toLocaleString()}L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Runoff Coefficient</span>
                        <span className="font-semibold">{results.runoff_coefficient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Collection Efficiency</span>
                        <Progress value={results.collection_efficiency * 100} className="w-24 h-2" />
                        <span className="font-semibold">{(results.collection_efficiency * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 shadow-water">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Site Characteristics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Soil Type</p>
                        <p className="font-semibold">{results.soil_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Aquifer Type</p>
                        <p className="font-semibold">{results.aquifer_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Groundwater Depth</p>
                        <p className="font-semibold">{results.groundwater_depth}m</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Recharge Potential</p>
                        <Badge variant="secondary">High</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-0 shadow-glow">
                <CardHeader>
                  <CardTitle>Rainfall Distribution Analysis</CardTitle>
                  <CardDescription>Monthly rainfall patterns for your location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    📊 Rainfall Chart would be rendered here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <Card className="glass-card border-0 shadow-water">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Recommended RWH Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">{results.recommended_structure}</h3>
                    <p className="text-muted-foreground">
                      Based on your property characteristics and local conditions, we recommend a first flush diverter 
                      system with underground storage tank. This system provides optimal water quality and storage efficiency.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <Card className="border border-border/50">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold">Installation Cost</h4>
                          <p className="text-2xl font-bold text-primary">₹{results.installation_cost.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-border/50">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold">Annual Maintenance</h4>
                          <p className="text-2xl font-bold text-primary">₹2,500</p>
                        </CardContent>
                      </Card>
                      <Card className="border border-border/50">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold">Payback Period</h4>
                          <p className="text-2xl font-bold text-primary">{results.payback_period} years</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-glow">
                <CardHeader>
                  <CardTitle>Cost-Benefit Analysis (10 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    📈 Financial Projection Chart would be rendered here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="glass-card border-0 shadow-water">
                  <CardHeader>
                    <CardTitle>Water Balance Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Harvestable Water</span>
                        <span className="font-semibold">{results.annual_harvestable_water.toLocaleString()}L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Household Demand</span>
                        <span className="font-semibold">18,000L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Demand Coverage</span>
                        <Badge variant="secondary">83%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 shadow-water">
                  <CardHeader>
                    <CardTitle>System Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Collection Efficiency</span>
                          <span>{(results.collection_efficiency * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={results.collection_efficiency * 100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Storage Efficiency</span>
                          <span>{(results.storage_efficiency * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={results.storage_efficiency * 100} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Groundwater Tab */}
            <TabsContent value="groundwater" className="space-y-6">
              <Card className="glass-card border-0 shadow-water">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Aquifer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Aquifer Type</h4>
                        <p className="text-muted-foreground">{results.aquifer_type} aquifer with high recharge potential</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Recharge Rate</h4>
                        <p className="text-muted-foreground">15-25% of harvested water contributes to groundwater recharge</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Water Quality</h4>
                        <p className="text-muted-foreground">Good quality with pH 7.2, suitable for domestic use after basic filtration</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Environmental Impact</h4>
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-primary" />
                          <span className="text-sm">CO₂ Reduction: {results.co2_reduction} tons/year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <Card className="glass-card border-0 shadow-water">
                <CardHeader>
                  <CardTitle>About JalRakshak AI</CardTitle>
                  <CardDescription>Understanding rainwater harvesting and our technology</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">How It Works</h4>
                    <p className="text-muted-foreground">
                      Our AI system analyzes multiple data sources including rainfall patterns, soil conditions, 
                      and property characteristics to provide accurate rainwater harvesting assessments.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technology Stack</h4>
                    <p className="text-muted-foreground">
                      Machine learning algorithms, satellite imagery analysis, meteorological data integration, 
                      and geological surveys combine to deliver precise recommendations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Sources</h4>
                    <p className="text-muted-foreground">
                      IMD rainfall data, soil surveys, groundwater reports, and real-time weather information 
                      ensure accuracy in our calculations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Results;