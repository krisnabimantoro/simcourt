import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CardKelompok() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Detail Kelompok</CardTitle>
        <CardDescription>Informasi Singkat</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 text-sm justify-between">
          <ul className="font-normal text-gray-600">
            <li>Mata Kuliah/Kelas</li>

            <li>Kelompok Praktikum</li>
            <li>Dosen Mata Kuliah</li>
            <li>Instruktur</li>
            <li>Asisten</li>
          </ul>
          <ul className="font-medium text-right">
            <li>Persidangan A</li>
            <li>Kelompok A</li>
            <li>Krisna Bimantoro</li>
            <li>Malik</li>
            <li>Rama</li>
          </ul>
        </div>
      </CardContent>
      {/* <CardFooter>
                  <p>Card Footer</p>
                </CardFooter> */}
    </Card>
  );
}
