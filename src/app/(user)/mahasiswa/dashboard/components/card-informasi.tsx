import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function CardInformasi() {
  return (
    <Card className="h-">
      <CardHeader>
        <CardTitle>Informasi Simcourt</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
