import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const provinsi = url.searchParams.get('provinsi');

    if (!provinsi || !/^\d{2}$/.test(provinsi)) {
      return NextResponse.json({ success: false, error: 'Invalid provinsi code' }, { status: 400 });
    }

    const query = `
      SELECT * FROM wilayah
      WHERE kode LIKE '${provinsi}.%' AND LENGTH(REPLACE(kode, '.', '')) = 4
    `;

    const result = await db.query(query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
