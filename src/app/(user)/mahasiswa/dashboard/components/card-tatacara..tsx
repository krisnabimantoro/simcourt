import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AnimatedBeamMultipleOutputDemo } from "./beam-dashboard";

export default function CardTatacara() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tata Cara Penggunaan Sim-Court </CardTitle>
        <CardDescription>Lab Hukum Universitas Muhammadiyah Malang</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatedBeamMultipleOutputDemo />
      </CardContent>
    </Card>
  );
}
