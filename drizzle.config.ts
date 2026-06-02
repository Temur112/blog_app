import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();


export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5434/blog_app"
    }
})