/*
*
* @file        rAuth.ts
* @author      David (@dvhsh)
* @description Authentication related endpoint routes
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

/*
* @function authenticate
* @description this function is used to authenticate a token
*
* @param { string } token
* @param { FastifyReply } response
*
* @returns { void }
*/
export const authenticate = async (token: string, response: FastifyReply) => {
    const restfulToken = process.env.API_TOKEN!;

    if (restfulToken === null || restfulToken === undefined) {
        response.send({ status: 401,  data: "Unauthorized" });
        return false;
    }

    if (token !== restfulToken) {
        response.send({ status: 401, data: "Unauthorized" });
        return false;
    }

    return true;
}

/*
    * @function rAuth
    * @description Registers auth related endpoints
    *
    * @param { FastifyInstance } fastify
    *
    * @returns { void }
*/
async function rAuth(fastify: FastifyInstance) {

    /*
    * @endpoint POST /auth
    * @description this is used to check if authorization header / token is valid
    *
    * @header { string } authorization
    *
    * @returns { 'status' : number, 'valid' : string } data
    *
    * @example /auth
    */
    fastify.post('/auth', async (request: FastifyRequest, response: FastifyReply) => {

        await authenticate(request.headers['authorization']!, response);

        return response.send({ status: 200, data: { 'valid': true } });
    });
}

export default rAuth;

// Path: src/route/rAuth.ts
