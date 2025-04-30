import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parent = url.searchParams.get('parent');

  let sql = `SELECT kode, nama FROM wilayah`;
  let params: any[] = [];

  if (parent) {
    const level = (parent as string).split('.').length;
    const nextLevel = level + 1;

    // Ambil child berdasarkan parent kode
    sql += ` WHERE kode LIKE ? AND LENGTH(REPLACE(kode, '.', '')) = ?`;
    params = [`${parent}%.%`, nextLevel * 2]; // Panjang kode tanpa titik (e.g. 2, 4, 6, 10)
  } else {
    // Ambil provinsi (level 1)
    sql += ` WHERE LENGTH(REPLACE(kode, '.', '')) = 2`;
  }

  try {
    const result = await db.query(sql, params);
    return NextResponse.json(result.rows);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'Database error', detail: err.message }, { status: 500 });
  }
}
