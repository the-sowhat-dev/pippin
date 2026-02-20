import { Pool } from "pg";

export interface Article {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  content: string;
  cover_image: string | null;
  author: string | null;
  category: string;
  keywords: string[] | null;
  reading_time: number | null;
  is_published: boolean | null;
  published_at: Date;
  collaboration: string | null;
  updated_at: Date | null;
  created_at: Date | null;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
