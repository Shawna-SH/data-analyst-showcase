import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, UploadCloud, Camera, Image as ImageIcon, Sparkles, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Demos() {
  const { toast } = useToast();
  
  // Numeric Demo State
  const [feature1, setFeature1] = useState("25");
  const [feature2, setFeature2] = useState("1000");
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  // Image Demo State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePredict = () => {
    setIsPredicting(true);
    // Simulate API call to a lightweight model
    setTimeout(() => {
      const f1 = parseFloat(feature1) || 0;
      const f2 = parseFloat(feature2) || 0;
      // Dummy baseline calculation: just a weighted sum
      const result = (f1 * 2.5) + (f2 * 0.1) + (Math.random() * 10 - 5);
      setPrediction(result);
      setIsPredicting(false);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size check (e.g., max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive"
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
       toast({
        title: "Invalid format",
        description: "Please upload a JPG or PNG file.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeImage = () => {
    if (!imageSrc) return;
    setIsAnalyzing(true);
    
    // Simulate image classification model inference
    setTimeout(() => {
      setAnalysisResult([
        { label: "Data Center Rack", confidence: 0.89 },
        { label: "Server Architecture", confidence: 0.76 },
        { label: "Electronic Equipment", confidence: 0.65 }
      ]);
      setIsAnalyzing(false);
    }, 1200);
  };

  const resetImageDemo = () => {
    setImageSrc(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container py-12 md:py-20 min-h-screen">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Interactive Demos</h1>
        <p className="text-lg text-muted-foreground">
          Lightweight, in-browser examples of predictive modeling and image processing architectures.
        </p>
      </div>

      <Tabs defaultValue="numeric" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="numeric" className="font-mono"><Calculator className="mr-2 h-4 w-4" /> Baseline Regression</TabsTrigger>
          <TabsTrigger value="numeric2" className="font-mono"><ImageIcon className="mr-2 h-4 w-4" /> Image Classification (Stub)</TabsTrigger>
        </TabsList>

        {/* Numeric Prediction Demo */}
        <TabsContent value="numeric">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle>Customer LTV Prediction (Baseline)</CardTitle>
              <CardDescription>
                A lightweight linear regression stub demonstrating a real-time inference loop. 
                In a real scenario, this connects to a FastAPI endpoint serving an XGBoost model.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="f1" className="font-mono text-xs text-muted-foreground uppercase">User Age (Days)</Label>
                    <Input 
                      id="f1" 
                      type="number" 
                      value={feature1} 
                      onChange={(e) => setFeature1(e.target.value)}
                      className="font-mono text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="f2" className="font-mono text-xs text-muted-foreground uppercase">Total Spend to Date ($)</Label>
                    <Input 
                      id="f2" 
                      type="number" 
                      value={feature2} 
                      onChange={(e) => setFeature2(e.target.value)}
                      className="font-mono text-lg"
                    />
                  </div>
                  <Button 
                    className="w-full font-mono mt-4" 
                    size="lg"
                    onClick={handlePredict}
                    disabled={isPredicting}
                  >
                    {isPredicting ? (
                      <span className="flex items-center"><RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> Calculating...</span>
                    ) : (
                      <span className="flex items-center"><Sparkles className="mr-2 h-4 w-4" /> Run Inference</span>
                    )}
                  </Button>
                </div>

                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                  {/* Decorative background grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  
                  <div className="relative z-10 w-full">
                    <h3 className="font-mono text-sm text-muted-foreground mb-4">PREDICTED LIFETIME VALUE</h3>
                    
                    {prediction !== null ? (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                          ${prediction.toFixed(2)}
                        </div>
                        <p className="text-sm text-muted-foreground font-mono bg-background/80 p-2 rounded inline-block mt-4">
                          Confidence Interval: ±$14.20
                        </p>
                      </div>
                    ) : (
                      <div className="text-4xl font-light text-muted border-2 border-dashed border-muted-foreground/20 rounded-xl py-8 w-full">
                        $0.00
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Classification Demo */}
        <TabsContent value="numeric2">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle>Image Classification Pipeline</CardTitle>
              <CardDescription>
                Upload an image to process it through a simulated ResNet architecture. 
                Images are processed entirely in-memory and discarded immediately.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Input Area */}
                <div className="flex flex-col gap-4">
                  {!imageSrc ? (
                    <div 
                      className="border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">Click to Upload Image</h3>
                      <p className="text-xs text-muted-foreground font-mono">JPG/PNG up to 2MB</p>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/jpeg, image/png"
                        onChange={handleFileUpload}
                      />
                    </div>
                  ) : (
                    <div className="relative border rounded-xl overflow-hidden aspect-square bg-black">
                      <img src={imageSrc} alt="Upload preview" className="w-full h-full object-contain" />
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="absolute top-2 right-2 opacity-80 hover:opacity-100"
                        onClick={resetImageDemo}
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <Button 
                    className="w-full font-mono" 
                    onClick={handleAnalyzeImage}
                    disabled={!imageSrc || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center"><RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> Running Model...</span>
                    ) : (
                      <span className="flex items-center"><Camera className="mr-2 h-4 w-4" /> Extract Features</span>
                    )}
                  </Button>
                </div>

                {/* Output Area */}
                <div className="bg-card border rounded-xl p-6 relative">
                   <h3 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider border-b pb-2">Analysis Results</h3>
                   
                   {!imageSrc ? (
                     <div className="flex items-center justify-center h-48 text-muted-foreground font-mono text-sm">
                       Awaiting input...
                     </div>
                   ) : isAnalyzing ? (
                     <div className="space-y-4 py-4 animate-pulse">
                        <div className="h-2 bg-muted rounded w-3/4"></div>
                        <div className="h-2 bg-muted rounded w-1/2"></div>
                        <div className="h-2 bg-muted rounded w-5/6"></div>
                        <p className="text-xs text-primary font-mono mt-8">Loading tensors into memory...</p>
                     </div>
                   ) : analysisResult ? (
                     <div className="space-y-4 animate-in fade-in duration-300">
                        {analysisResult.map((res: any, idx: number) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{res.label}</span>
                              <span className="font-mono text-muted-foreground">{(res.confidence * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${res.confidence * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                        
                        <div className="mt-8 pt-4 border-t bg-muted/20 p-3 rounded text-xs font-mono text-muted-foreground break-all">
                          <span className="text-primary font-bold">LOG:</span> Model loaded successfully (43ms). Extracted 2048 feature vectors. Output layer activated.
                        </div>
                     </div>
                   ) : (
                     <div className="flex items-center justify-center h-48 text-muted-foreground font-mono text-sm">
                       Ready to process.
                     </div>
                   )}
                </div>

              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
