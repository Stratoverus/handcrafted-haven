import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"] || "postgresql://neondb_owner:npg_Vgvfx5wAUSW1@ep-solitary-mouse-ah2fiec4-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});
