import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Droplets, 
  Zap, 
  Leaf, 
  Calculator, 
  TrendingUp, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-water.jpg';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';

const Home = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Smart Calculations",
      description: "AI-powered assessment of your rainwater harvesting potential based on local conditions."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Predictive Analytics", 
      description: "Machine learning predictions for water savings and system efficiency."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Comprehensive Reports",
      description: "Detailed analysis with cost-benefit projections and installation guidance."
    }
  ];

  const benefits = [
    "Calculate annual harvestable water potential",
    "Get customized system recommendations",
    "Analyze cost-benefit with payback period",
    "Understand local soil and groundwater conditions",
    "Generate detailed PDF reports",
    "Access Google Earth integration for measurements"
  ];

  const stats = [
    { value: "40%", label: "Water Bills Reduction" },
    { value: "15L", label: "Average Daily Savings" },
    { value: "₹50K", label: "Typical System Cost" },
    { value: "5 Years", label: "Average Payback" }
  ];

  // Chatbot FAB and iframe styles
  const chatbotStyles = `
    #jal-chat-fab {
      position: fixed;
      bottom: 40px;
      right: 20px;
      width: 64px;
      height: 64px;
      z-index: 9999;
      background: #2563eb;
      color: #fff;
      border-radius: 50%;
      box-shadow: 0 4px 16px rgba(0,0,0,0.24);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 2rem;
      transition: transform 0.2s ease-in-out;
    }
    #jal-chat-fab:hover {
      transform: scale(1.1);
    }
    #jal-chat-iframe-wrapper {
      display: ${chatbotOpen ? 'block' : 'none'};
      position: fixed;
      bottom: 120px;
      right: 20px;
      z-index: 10000;
    }
    #jal-chat-iframe {
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 18px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.3);
      background: white;
    }
    #close-btn {
      text-align: right;
      margin-top: 8px;
    }
    #close-btn button {
      background:#ef4444;
      color:white;
      border:none;
      border-radius:6px;
      padding: 6px 14px;
      font-weight:bold;
      cursor:pointer;
      transition: background-color 0.2s ease;
    }
    #close-btn button:hover {
      background: #dc2626;
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-sky">

      {/* Chatbot CSS injection */}
      <style>{chatbotStyles}</style>

      {/* Chatbot Floating Action Button */}
      {!chatbotOpen && (
        <div
          id="jal-chat-fab"
          onClick={() => setChatbotOpen(true)}
          title="Chat with Jal Rakshak AI"
        >
          🤖
        </div>
      )}

      {/* Chatbot Iframe Popup */}
      {chatbotOpen && (
        <div id="jal-chat-iframe-wrapper">
          <iframe
            id="jal-chat-iframe"
            src="https://jal-rakshak-ai-v3.vercel.app/"
            title="Jal Rakshak AI Chatbot"
          ></iframe>
          <div id="close-btn">
            <button onClick={() => setChatbotOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Main site content (unchanged) */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Smart <span className="bg-gradient-water bg-clip-text text-transparent">Rainwater</span>
                  <br />Harvesting with AI
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover your water conservation potential with our AI-powered assessment tool. 
                  Get personalized recommendations, cost analysis, and technical specifications 
                  for implementing rainwater harvesting systems.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/assessment">
                  <Button variant="hero" size="xl" className="group">
                    <Droplets className="h-5 w-5" />
                    Start Free Assessment
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="glass" size="xl">
                  <Zap className="h-5 w-5" />
                  See Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-1">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Interactive Splash Screen */}
              <div className="relative rounded-2xl overflow-hidden shadow-water h-96">
                <SplashScreen 
                  autoPlay={true}
                  className="w-full h-full"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-aqua/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-water-blue/20 rounded-full blur-xl animate-pulse" 
                   style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Powered by <span className="bg-gradient-water bg-clip-text text-transparent">Advanced AI</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent system analyzes multiple data sources to provide accurate, 
              personalized rainwater harvesting recommendations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-0 shadow-soft hover:shadow-water transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-water rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                What You'll <span className="bg-gradient-water bg-clip-text text-transparent">Discover</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Get comprehensive insights about your rainwater harvesting potential 
                with our detailed assessment and recommendations.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/assessment">
                <Button variant="water" size="lg" className="group">
                  Get Started Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <Card className="glass-card border-0 shadow-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>CO₂ Reduction</span>
                    <span className="font-semibold text-primary">2.5 tons/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water Saved</span>
                    <span className="font-semibold text-primary">15,000L/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Energy Savings</span>
                    <span className="font-semibold text-primary">₹8,000/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Groundwater Recharge</span>
                    <span className="font-semibold text-primary">High Impact</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Save Water and Money?
            </h2>
            <p className="text-xl text-white/90">
              Start your personalized rainwater harvesting assessment today. 
              It takes just 5 minutes to get comprehensive recommendations.
            </p>
            <Link to="/assessment">
              <Button variant="glass" size="xl" className="group">
                <Droplets className="h-5 w-5" />
                Start Your Assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating water droplets */}
        <div className="absolute top-10 left-10 w-4 h-6 bg-white/30 rounded-full water-drop" />
        <div className="absolute top-20 right-20 w-3 h-5 bg-white/20 rounded-full water-drop" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-5 h-7 bg-white/25 rounded-full water-drop" 
             style={{ animationDelay: '2s' }} />
      </section>
    </div>
  );
};

export default Home;
