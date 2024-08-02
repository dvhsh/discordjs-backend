import { FastifyInstance, FastifyReply, FastifyRequest   } from "fastify";

import { indexLatestStats, updateStats                   } from "@controller/cBotStatsController";
import { indexGuild, indexUser, setGuildPrefix           } from "@controller/cIndexing";
import { authenticate                                    } from "@route/rAuth";

type IndexRequest = FastifyRequest<{
    Params: {
        id: string;
    };
}>

/*
    * @function rBot
    * @param { FastifyInstance } fastify
    * @description Registers auth related endpoints
*/
async function rBot(fastify: FastifyInstance) {

    /* ADMIN ENDPOINT
    * @endpoint GET /bot/user/:id
    * @description Get a bot user by Discord user ID
    *
    * @header { string } authorization
    *
    * @param { string } id
    *
    * @returns { 'user' : object } data
    *
    * @example /bot/user/123456789
    */
    fastify.get('/bot/user/:id', async (request: IndexRequest, response: FastifyReply) => {

        await authenticate(request.headers['authorization']!, response);

        const { id } = request.params;

        if (!id) { return response.send({ status: 400, data: "Invalid request" }); }

        const user = await indexUser(id);

        response.send({status: 200, data: { 'user' : user }});
    });

    /* ADMIN ENDPOINT
    * @endpoint GET /bot/guild/:id
    * @description Get a bot guild by Discord guild ID
    *
    * @header { string } authorization
    *
    * @param { string } id
    *
    * @returns { 'guild' : object } data
    *
    * @example /bot/guild/123456789
    */
    fastify.get('/bot/guild/:id', async (request: IndexRequest, response: FastifyReply) => {

        await authenticate(request.headers['authorization']!, response);

        const { id } = request.params;

        if (!id) { return response.send({ status: 400, data: "Invalid request" }); }

        const guild = await indexGuild(id);

        response.send({ status: 200, data: { 'guild' : guild } });
    });

    /* ADMIN ENDPOINT
    * @endpoint POST /bot/guild/prefix/:id
    * @description Set a guild prefix by Discord guild ID
    *
    * @header { string } authorization
    *
    * @param { string } id
    * @param { string } prefix
    *
    * @returns { 'message' : string } data
    *
    * @example /bot/guild/prefix/123456789
    */
    fastify.post('/bot/guild/prefix/:id', async (request: IndexRequest, response: FastifyReply) => {

        await authenticate(request.headers['authorization']!, response);

        const { id } = request.params;
        const { prefix } = request.body as { prefix: string };

        if (!id || !prefix) { return response.send({ status: 400, data: { 'message' : "Prefix updated" } }); }

        await setGuildPrefix(id, prefix);

        response.send({ status: 200, data: { 'message' : "Prefix updated" } });
    });

    /*
    * @endpoint GET /bot/stats
    * @description Get the latest stats
    *
    * @header { string } authorization
    *
    * @returns { 'stats' : object } data
    */
    fastify.get('/bot/stats', async (request: FastifyRequest, response: FastifyReply) => {

        await authenticate(request.headers['authorization']!, response);

        const stats = await indexLatestStats();

        response.send({ status: 200, data: { 'stats' : stats } });
    });

    /* ADMIN ENDPOINT
    * @endpoint POST /bot/stats
    *
    * @header { string } authorization
    *
    * @param { number } guilds
    * @param { number } users
    * @param { number } commands
    *
    * @returns { 'stats' : object } data
    */
    fastify.post('/bot/stats', async (request: FastifyRequest, response: FastifyReply) => {

        await authenticate(request.headers['authorization']!, response);

        const { guilds, users, commands } = request.body as { guilds: number, users: number, commands: number };

        if (!guilds || !users || !commands) { return response.send({ status: 400, data: "Invalid request" }); }

        const stats = await updateStats(guilds, users, commands);

        response.send({ status: 200, data: { 'stats' : stats } });
    });
}

export default rBot;

// Path: src/route/rBot.ts