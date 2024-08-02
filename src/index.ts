/*
*
* @file        index.ts
* @author      David (@dvhsh)
* @description Discord.js API server boilerplate
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import "dotenv/config";

import { connect }                  from "mongoose";

import fastify, {FastifyInstance }  from "fastify";
import rateLimit                    from "@fastify/rate-limit";
import compress                     from "@fastify/compress";
import helmet                       from "@fastify/helmet";
import cors                         from "@fastify/cors";

import { APIEnvironment }           from "@enum/eAPIEnvironment";
import pkg                          from "@package";

/////////////////////////////////////////////////////////////
//
// Fastify / Server Configuration
//
/////////////////////////////////////////////////////////////

const API_ENVIRONMENT : string          = process.env.API_ENVIRONMENT as string;
const PORT            : number          = process.env.PORT ? parseInt(process.env.PORT) : 3008;
const HOST            : String          = `localhost`;
const app             : FastifyInstance = fastify({ logger: false });

/////////////////////////////////////////////////////////////
//
// Fastify / Server Routes
//
/////////////////////////////////////////////////////////////

import rAuth                        from "@route/rAuth";
import rAPI                         from '@route/rAPI';
import rBot                         from '@route/rBot';

/////////////////////////////////////////////////////////////

// requests per minute
const handleRateLimit = (env: string) => {
    switch (env) {
        case APIEnvironment.Development : return 999;
        case APIEnvironment.Production  : return 60;
        default                         : return 0;
    }
}

/*
* @function main
* @description Main function to start the Fastify server
*
* @param { FastifyInstance } fastify
*
* @returns { void }
*/
async function main(fastify: FastifyInstance) {


    // no environment defined
    if (!API_ENVIRONMENT) { throw new Error("API_ENVIRONMENT is not defined"); }

    // invalid environment defined
    if (!Object.values(APIEnvironment).includes(API_ENVIRONMENT as APIEnvironment)) { throw new Error("API_ENVIRONMENT is not a valid environment"); }

    await fastify.register(rateLimit, {

        max: handleRateLimit(API_ENVIRONMENT),
        timeWindow: '1 minute'
    });

    fastify.register(compress);
    fastify.register(helmet);
    fastify.register(cors);

    if (API_ENVIRONMENT == APIEnvironment.Production) {

        console.log('Connecting to databases. . .')

        const DB     = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`;
        await connect(DB);

        await rAuth(fastify);
    }

    await rAPI(fastify);
    await rBot(fastify);

    fastify.listen({port: PORT}, (err, address) => {

        if (err) { console.error(err); process.exit(1); }
    });
}

main(app).then(r => { console.log(`[${new Date().toLocaleString()}] [${pkg.version}/${API_ENVIRONMENT}] | Server started and listening at [${HOST}:${PORT}]`); });

// Path: src/index.ts
