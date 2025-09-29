import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* About / Project Overview */}
          <Card className="glass-card border-0 shadow-water">
            <CardHeader>
              <CardTitle>About This Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <h3 className="text-lg font-semibold">Project Overview</h3>
              <p className="text-muted-foreground">
                This Rooftop Rainwater Harvesting Assessment Tool is designed to promote public participation in groundwater
                conservation by enabling users to estimate the feasibility of rooftop rainwater harvesting (RTRWH) and
                artificial recharge at their locations.
              </p>
            </CardContent>
          </Card>

          {/* How it works / Tech stack / Benefits / Data sources */}
          <Card className="glass-card border-0 shadow-water">
            <CardHeader>
              <CardTitle>How It Works & Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">How It Works</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                      <li><span className="text-foreground font-medium">Input Analysis</span>: We analyze your roof characteristics and location</li>
                      <li><span className="text-foreground font-medium">Data Processing</span>: Fetch local rainfall, soil, and groundwater data</li>
                      <li><span className="text-foreground font-medium">ML Modeling</span>: Use machine learning to predict optimal solutions</li>
                      <li><span className="text-foreground font-medium">Recommendations</span>: Provide customized RWH system recommendations</li>
                      <li><span className="text-foreground font-medium">Economic Analysis</span>: Calculate costs, savings, and payback period</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Technology Stack</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li><strong className="text-foreground">Frontend</strong>: React + Vite Web Application</li>
                      <li><strong className="text-foreground">Backend</strong>: FastAPI RESTful API</li>
                      <li><strong className="text-foreground">Machine Learning</strong>: Scikit-learn models</li>
                      <li><strong className="text-foreground">Data Storage</strong>: PostgreSQL with PostGIS</li>
                      <li><strong className="text-foreground">Visualization</strong>: Recharts</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Benefits of Rainwater Harvesting</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>💧 <strong className="text-foreground">Water Security</strong>: Reduce dependence on municipal supply</li>
                      <li>💰 <strong className="text-foreground">Cost Savings</strong>: Lower water bills and reduced energy costs</li>
                      <li>🌱 <strong className="text-foreground">Environmental Protection</strong>: Reduce runoff and recharge groundwater</li>
                      <li>🏙️ <strong className="text-foreground">Urban Resilience</strong>: Mitigate urban flooding during heavy rains</li>
                      <li>🌍 <strong className="text-foreground">Climate Adaptation</strong>: Build resilience to climate change impacts</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Data Sources</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Indian Meteorological Department (Rainfall data)</li>
                      <li>Central Ground Water Board (Groundwater data)</li>
                      <li>National Bureau of Soil Survey (Soil data)</li>
                      <li>OpenStreetMap (Geocoding services)</li>
                      <li>Research publications and field studies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="glass-card border-0 shadow-water">
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-amber-300/60 bg-amber-50/60 dark:bg-amber-950/20 p-4 text-sm text-amber-800 dark:text-amber-200">
                <p>
                  This tool provides preliminary estimates based on standard parameters and available data. For detailed design and
                  implementation, consult with certified rainwater harvesting professionals. Actual results may vary based on local
                  conditions, construction quality, and maintenance practices.
                </p>
                <p className="mt-2">
                  Always check local regulations and obtain necessary permits before implementing any rainwater harvesting system.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground pt-2">
            <p>Developed for sustainable water management | © 2023 Central Ground Water Board (CGWB)</p>
            <p>For technical support: support@rwhindia.org | Phone: +91-XXX-XXXX-XXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
