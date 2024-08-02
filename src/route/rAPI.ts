/*
*
* @file        rAPI.ts
* @author      David (@dvhsh)
* @description API related endpoint routes
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import pkg                                               from "@package";

/*
* @function rAPI
* @description Registers API related endpoints
*
* @param { FastifyInstance } fastify
*
* @returns { void }
*/
async function rAPI(fastify: FastifyInstance) {

    /*
    * @endpoint GET /api/version
    * @description Get the version of the API
    *
    * @returns { 'version' : string, 'environment' } data
    *
    * @example /api/version
    */
    fastify.get("/api/version", async (req: FastifyRequest, res: FastifyReply) => {
        res.status(200).send({ status: 200, data : { 'version': pkg.version, 'environment': process.env.API_ENVIRONMENT } });
    });

}

export default rAPI;

// Path: src/route/rAPI.ts
