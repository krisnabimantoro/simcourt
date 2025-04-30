// app/api/kecamatan/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const kabupaten = url.searchParams.get('kabupaten');

    // Validasi input: kabupaten wajib dan berbentuk kode wilayah
    if (!kabupaten || !/^\d{2}\.\d{2}$/.test(kabupaten)) {
      return NextResponse.json({ success: false, error: 'Invalid kabupaten code' }, { status: 400 });
    }

    // Pattern LIKE untuk semua kecamatan di bawah kabupaten
    const pattern = `${kabupaten}.%`;

    const result = await db.query(
      `SELECT * FROM wilayah WHERE kode LIKE '${pattern}' AND LENGTH(REPLACE(kode, '.', '')) = 6`
    );

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Kecamatan API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
