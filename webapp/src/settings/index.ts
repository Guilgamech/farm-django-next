import { z } from 'zod';

// Define the schema for the environment variables
const envSchema = z.object({
  API_URL: z.string(),
  SECRET: z.string()
});

// Parse and validate the environment variables
const parsed = envSchema.safeParse(process.env);
if(!parsed.success){
  throw new Error("Check environment variables")
}
const settings = parsed.data
export default settings;
