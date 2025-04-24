import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

export const ParamsSchema = z.object({
    animeId: z
        .string()
        .min(3)
        .openapi({
            param: {
                name: 'animeId',
                in: 'path',
            },
            example: '1212121',
        }),
})

export const AnimeSchema = z.object({
    id: z.string().openapi({ example: 'coolbro' }),
    title: z.string().openapi({ example: 'SPY X FAMILY' }),
    description: z.string().openapi({ example: 'A family of spies' }),
}).openapi('Anime')


export const animeRoute = createRoute({
    method: 'get',
    path: '/anime/:animeId',
    tags: ['Anime'],
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: AnimeSchema,
                }
            }
        }
    },
    description: 'Get anime by id',
});

export const animeHandler = async (c: any) => {
    const { animeId } = await c.req.valid('param')
    console.log('animeId', animeId);
    return c.json({
        id: 'coolbro',
        title: 'SPY X FAMILY',
        description: 'A family of spies'
    });
}

const animeRouter = new OpenAPIHono({
    strict: false
}).openapi(animeRoute, animeHandler);

export default animeRouter;