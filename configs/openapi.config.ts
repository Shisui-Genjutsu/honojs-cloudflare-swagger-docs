import { Scalar } from '@scalar/hono-api-reference';
import packageJson from '@/package.json';
import { AnimeSchema } from '@/src/router/anime.route';

const configureOpenAPI = (app: any) => {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJson.version,
            title: 'Anime API Docs',
        },
        components: {
            schemas: {
                Anime: AnimeSchema.openapi.schema,
            }
        }
    })

    app.get('/docs', Scalar({
        url: '/doc',
        pageTitle: 'Anime API Docs',
        layout: 'classic',
        theme: "kepler",
        defaultHttpClient: {
            targetKey: 'js',
            clientKey: 'fetch',
        }
    }))
}

export default configureOpenAPI