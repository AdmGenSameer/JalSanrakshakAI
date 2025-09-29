import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Users, 
  Home as HomeIcon, 
  Layers, 
  Calendar, 
  Calculator,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Droplets,
  Loader2
} from 'lucide-react';
import WaterTank from '@/components/WaterTank';
import Navbar from '@/components/Navbar';
import MapLocator from '@/components/MapLocator';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';

interface FormData {
  name: string;
  location: string;
  dwellers: string;
  roofArea: string;
  openSpace: string;
  roofType: string;
  roofAge: string;
  soilType: string;
  latitude: number | null;
  longitude: number | null;
}

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    dwellers: '',
    roofArea: '',
    openSpace: '',
    roofType: '',
  roofAge: '',
  soilType: '',
  latitude: null,
  longitude: null
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Compute form completion progress for WaterTank (do not require lat/lng to hit 100%)
  const formCompletion = (() => {
    const checks = [
      !!formData.name.trim(),
      !!formData.location.trim(),
      !!formData.dwellers.toString().trim(),
      !!formData.roofArea.toString().trim(),
      !!formData.openSpace.toString().trim(),
      !!formData.roofType.trim(),
      !!formData.roofAge.toString().trim(),
      // soilType excluded from progress (no current input field)
    ];
    const filled = checks.filter(Boolean).length;
    return (filled / checks.length) * 100;
  })();

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const { toast } = useToast();
  const [geoLoading, setGeoLoading] = useState(false);
  const lastGeocodedRef = useRef<string>('');

  // Geocode helper using OpenStreetMap Nominatim (no API key required)
  async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    try {
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
      }
      console.warn('Geocoding failed: no results');
      return null;
    } catch (e) {
      console.error('Geocoding error:', e);
      return null;
    }
  }

  // Debounce geocoding by 3 seconds after typing stops
  useEffect(() => {
    const address = formData.location.trim();
    if (!address || address === lastGeocodedRef.current) return;
    setGeoLoading(true);
    const t = setTimeout(async () => {
      // ensure still the same address after debounce
      if (address !== formData.location.trim()) return;
      const result = await geocodeAddress(address);
      if (result) {
        setFormData(prev => ({ ...prev, latitude: result.lat, longitude: result.lng }));
        lastGeocodedRef.current = address;
  toast({ title: 'Coordinates detected', description: `${result.lat.toFixed(5)}, ${result.lng.toFixed(5)}` });
      }
      setGeoLoading(false);
    }, 3000);

    return () => {
      clearTimeout(t);
      setGeoLoading(false);
    };
  }, [formData.location, toast]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        dwellers: Number(formData.dwellers) || 0,
        roof_area: Number(formData.roofArea) || 0,
        open_space: Number(formData.openSpace) || 0,
        roof_type: formData.roofType || 'concrete',
        roof_age: Number(formData.roofAge) || 0,
      };
      const created = await api.createAssessment(payload);
      navigate(`/results?id=${created.id}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Please try again later.';
      console.error('Submit failed', e);
      toast({ title: 'Submission failed', description: msg });
    }
  };

  const generateGoogleEarthLink = () => {
    if (formData.latitude != null && formData.longitude != null) {
      const lat = formData.latitude.toFixed(6);
      const lng = formData.longitude.toFixed(6);
      return `https://earth.google.com/web/search/${encodeURIComponent(`${lat}, ${lng}`)}`;
    }
    if (formData.location) {
      const encodedLocation = encodeURIComponent(formData.location);
      return `https://earth.google.com/web/search/${encodedLocation}`;
    }
    return 'https://earth.google.com/web/';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="glass-card border-0 shadow-water">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-water rounded-lg flex items-center justify-center text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Basic Information</CardTitle>
              <CardDescription>Let's start with some basic details about you and your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="bg-background/50"
                />
              </div>

              {/* Number of dwellers (moved under Full Name) */}
              <div className="space-y-2">
                <Label htmlFor="dwellers" className="text-sm font-medium">Number of dwellers</Label>
                <Input
                  id="dwellers"
                  type="number"
                  placeholder="e.g., 4"
                  value={formData.dwellers}
                  onChange={(e) => updateFormData('dwellers', e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-xs text-red-500">* No. of people living in the house</p>
              </div>

              {/* Location at bottom with inline map when available */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location/Address
                </Label>
                <Textarea
                  id="location"
                  placeholder="Enter your complete address including city, state, and pincode"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="bg-background/50 resize-none"
                  rows={3}
                />
                
                {formData.latitude != null && formData.longitude != null && (
                  <div className="pt-2">
                    <MapLocator
                      height={220}
                      position={[formData.latitude, formData.longitude]}
                      interactive={false}
                      showLocateButton={false}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="glass-card border-0 shadow-water">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-water rounded-lg flex items-center justify-center text-white mb-4">
                <HomeIcon className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Property Details</CardTitle>
              <CardDescription>Tell us about your roof and available space</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Helper: Google Earth CTA (above roof area) */}
              <div className="rounded-lg p-4 bg-background/50 border border-dashed">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-medium">Don't know your roof area?</p>
                    <p className="text-sm text-muted-foreground">Open Google Earth to measure your rooftop with the ruler tool.</p>
                  </div>
                  <Button
                    onClick={() => window.open(generateGoogleEarthLink(), '_blank')}
                    variant="water"
                    className="inline-flex items-center gap-2"
                  >
                    Measure on Google Earth
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofArea" className="text-sm font-medium flex items-center gap-2">
                  Roof Area (sq. meters)
                  
                </Label>
                <Input
                  id="roofArea"
                  type="number"
                  placeholder="e.g., 150"
                  value={formData.roofArea}
                  onChange={(e) => updateFormData('roofArea', e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">
                  Don't know your roof area? Click "Measure on Google Earth" to calculate it accurately
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openSpace" className="text-sm font-medium">Available Open Space (sq. meters)</Label>
                <Input
                  id="openSpace"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.openSpace}
                  onChange={(e) => updateFormData('openSpace', e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground text-red-600">
                  * Open Space is the area in which you want Rainwater Harvesting.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="glass-card border-0 shadow-water">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-water rounded-lg flex items-center justify-center text-white mb-4">
                <Layers className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Roof Specifications</CardTitle>
              <CardDescription>Details about your roof type and condition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Roof Type</Label>
                <Select value={formData.roofType} onValueChange={(value) => updateFormData('roofType', value)}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select your roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concrete">Concrete</SelectItem>
                    <SelectItem value="tiled">Tiled</SelectItem>
                    <SelectItem value="metal">Metal Sheet</SelectItem>
                    <SelectItem value="asbestos">Asbestos</SelectItem>
                    <SelectItem value="thatched">Thatched</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              

              <div className="space-y-2">
                <Label htmlFor="roofAge" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Roof Age (years)
                </Label>
                <Input
                  id="roofAge"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.roofAge}
                  onChange={(e) => updateFormData('roofAge', e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">
                  Helps us assess the structural integrity and water quality considerations
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="glass-card border-0 shadow-water">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-water rounded-lg flex items-center justify-center text-white mb-4">
                <Calculator className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Review & Calculate</CardTitle>
              <CardDescription>Review your information and generate your personalized assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Number of dwellers:</strong> {formData.dwellers}</div>
                <div><strong>Roof Area:</strong> {formData.roofArea} sq.m</div>
                <div><strong>Open Space:</strong> {formData.openSpace} sq.m</div>
                <div><strong>Roof Type:</strong> {formData.roofType}</div>
                <div><strong>Roof Age:</strong> {formData.roofAge} years</div>
                
              </div>
              <div className="pt-4 border-t">
                <div><strong>Location:</strong></div>
                <p className="text-sm text-muted-foreground mt-1">{formData.location}</p>
                {(formData.latitude != null && formData.longitude != null) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Coordinates: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)} (used for Google Earth)
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Rainwater Harvesting <span className="bg-gradient-water bg-clip-text text-transparent">Assessment</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this quick assessment to get personalized recommendations for your rainwater harvesting system
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Header */}
              <Card className="glass-card border-0">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(progress)}% Complete
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>

              {/* Form Step */}
              {renderStep()}

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button
                    variant="water"
                    onClick={handleSubmit}
                    className="flex items-center gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    Generate Assessment
                  </Button>
                ) : (
                  <Button
                    variant="water"
                    onClick={handleNext}
                    className="flex items-center gap-2"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Water Tank Progress Visualization (at top) */}
              <Card className="glass-card border-0 shadow-glow">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg flex items-center justify-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Assessment Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <WaterTank progress={formCompletion} />
                  <p className="text-sm text-center text-muted-foreground">
                    Your form is {Math.round(formCompletion)}% complete. 
                    Fill in more details to improve accuracy.
                  </p>
                </CardContent>
              </Card>

              {/* Quick Tips below tank */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>• Accurate roof measurements improve calculation precision.</p>
                  <p>• Consider all roof surfaces including garages and sheds.</p>
                  <p>• Newer roofs can improve water collection efficiency.</p>
                  <p>• Location helps auto-fetch local rainfall data.</p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;