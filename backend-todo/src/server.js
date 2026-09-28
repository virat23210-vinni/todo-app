import app from './app.js';import {env,validateEnv} from './config/env.js';validateEnv();app.listen(env.port,()=>console.log(`Teen Tracker API listening on ${env.port}`));
