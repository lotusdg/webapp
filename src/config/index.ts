import "dotenv/config";

interface iConfig {
  port: number;
  dbUrl: string;
}

const config: iConfig = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL
}

export = config;
