import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, UploadCloud, Camera, Image as ImageIcon, Sparkles, RefreshCcw, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams, useLocation } from "wouter";

export default function Demos() {
  const { toast } = useToast();
  const params = useParams<{ slug?: string }>();
  const [, setLocation] = useLocation();

  const currentSlug = params?.slug || "pet-classifier";

  const handleTabChange = (value: string) => {
    setLocation(`/demos/${value}`);
  };

  return (
    <div className="container py-12 md:py-20 min-h-screen">
      <div className="w-full max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Interactive Demos</h1>
        <p className="text-lg text-muted-foreground">
          Lightweight, in-browser examples of predictive modeling and image processing architectures.
        </p>
      </div>

      <Tabs value={currentSlug} onValueChange={handleTabChange} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="pet-classifier" className="font-mono"><ImageIcon className="mr-2 h-4 w-4" /> Pet Image Classifier</TabsTrigger>
          <TabsTrigger value="coming-soon" className="font-mono"><Sparkles className="mr-2 h-4 w-4" /> Coming Soon</TabsTrigger>
        </TabsList>

        {/* Pet Image Classifier Demo */}
        <TabsContent value="pet-classifier">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle>Pet Image Classifier (Cat vs Dog)</CardTitle>
              <CardDescription>
                Upload an image and the model will classify whether it is a cat or a dog using a fine-tuned deep learning model.
                First load may take a few seconds due to model startup.
              </CardDescription>
              <div className="flex gap-2 pt-2">
                 <span className="text-[10px] font-mono font-normal inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">PyTorch</span>
                 <span className="text-[10px] font-mono font-normal inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">ResNet18</span>
                 <span className="text-[10px] font-mono font-normal inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Hugging Face Spaces</span>
                 <span className="text-[10px] font-mono font-normal inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Image Classification</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="https://maizishawna-pet-image-classifier-binary-cat-and-dog.hf.space"
                className="w-full"
                style={{ height: "750px", border: "none" }}
                title="Pet Image Classifier Demo"
              />
            </CardContent>
            <CardFooter className="bg-muted/10 border-t flex justify-center p-4">
              <a 
                href="https://huggingface.co/spaces/MaiziShawna/pet-image-classifier-binary-cat-and-dog" 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center transition-colors"
              >
                Open full demo on Hugging Face <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Coming Soon */}
        <TabsContent value="coming-soon">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                This demo is currently under development. More interactive machine learning and data projects will be added soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-xl font-medium">Work in Progress</h3>
                <p className="text-muted-foreground max-w-md">
                  I'm currently building new interactive examples to showcase data engineering pipelines and advanced predictive models. Check back later!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
