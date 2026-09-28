import 'dotenv/config';
const required=['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','JWT_SECRET'];
export const env={port:process.env.PORT||5000,nodeEnv:process.env.NODE_ENV||'development',supabaseUrl:process.env.SUPABASE_URL,supabaseServiceKey:process.env.SUPABASE_SERVICE_ROLE_KEY,jwtSecret:process.env.JWT_SECRET,jwtExpiresIn:process.env.JWT_EXPIRES_IN||'7d',frontendUrl:process.env.FRONTEND_URL||'http://localhost:5173'};
export function validateEnv(){const missing=required.filter(k=>!process.env[k]);if(missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`)}
