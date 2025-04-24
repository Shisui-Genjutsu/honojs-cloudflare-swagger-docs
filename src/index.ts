import { cors } from 'hono/cors';
import { OpenAPIHono } from '@hono/zod-openapi';
import configureOpenAPI from '@/configs/openapi.config';
import animeRouter from '@/src/router/anime.route';

const app = new OpenAPIHono({
  strict: false
})

// CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

// Open API Docs
configureOpenAPI(app)

// API Routes
app.route('/', animeRouter)

export default app
