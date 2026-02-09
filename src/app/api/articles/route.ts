import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '16', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const client = await pool.connect();
    try {
      const query = `
        SELECT *
        FROM articles
        WHERE is_published = true
        ORDER BY id DESC
        LIMIT $1 OFFSET $2
      `;
      const result = await client.query(query, [limit, offset]);
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
