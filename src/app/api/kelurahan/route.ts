// app/api/kelurahan/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const kecamatan = url.searchParams.get('kecamatan');

    // Validasi input: kecamatan wajib dan berbentuk kode wilayah
    if (!kecamatan || !/^\d{2}\.\d{2}\.\d{2}$/.test(kecamatan)) {
      return NextResponse.json({ success: false, error: 'Invalid kecamatan code' }, { status: 400 });
    }

    // Buat pattern SQL LIKE untuk anak dari kecamatan
    const pattern = `${kecamatan}.%`;

    const result = await db.query(
      `SELECT * FROM wilayah WHERE kode LIKE '${pattern}' AND LENGTH(REPLACE(kode, '.', '')) = 10`
    );

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Kelurahan API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
