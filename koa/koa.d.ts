// Type definitions for Koa

/* =================== USAGE ===================

    import * as koa from "koa";
    var app = koa();

 =============================================== */

/// <reference path="../node/node.d.ts" />

declare module Koa {
    
    // These open interfaces may be extended in an application-specific manner via declaration merging.
    // See for example method-override.d.ts (https://github.com/borisyankov/DefinitelyTyped/blob/master/method-override/method-override.d.ts)
    export interface Request { }
    export interface Response { }
    export interface Context { }
    export interface Application { }
}


declare module "koa" {
    import * as http from "http";
    
    function koa(): koa.Koa;
    
    module koa {
        interface Base {
            constructor(): void;
            toJSON(): Object;
            inspect(): Object;
        }
        
        interface Cookie {
            get(name: string, options?: CookieOptions): string;
            set(name: string, value: any, options?: CookieOptions): void;
        }
        
        interface CookieOptions {
            signed?: boolean;
            expires?: Date;
            httpOnly?: boolean;
            path?: string;
            domain?: string;
            secure?: boolean;
        }
        
        interface Application extends Koa.Application {
            env: string;
            keys: Array<string>;
            subdomainOffset: number;
            middleware: Array<Function>;
            context: Context;
            request: Request;
            response: Response;
    
            listen(port: number, hostname: string, backlog: number, callback?: Function): http.Server;
            listen(port: number, hostname: string, callback?: Function): http.Server;
            listen(port: number, callback?: Function): http.Server;
            listen(path: string, callback?: Function): http.Server;
            listen(handle: any, listeningListener?: Function): http.Server;
            
            callback(): (request: http.IncomingMessage, response: http.ServerResponse) => void;
            use(fn: Function): Application;
            on(event: string, fn: Function): void;
            createContext(req: Request, res: Response): void;
        }
        
        interface Context extends Base, Koa.Context {
            req: http.ClientRequest;
            res: http.ServerResponse;
            request: Request;
            response: Response;
            state: string;
            app: Application;
            cookies: Cookie;
            respond: boolean;
            
            throw(err: Error): void;
            throw(msg: string): void;
            throw(status: number): void;
            throw(msg: string, status: number): void;
            throw(status: number, msg: string): void;
            throw(err: Error, status: number): void;
            throw(status: number, err:Error): void;
            throw(object: Object): void;
            throw(msg?: string, status?: number, properties?: Object): void;
            
            assert(value: any, msg?: string, status?: number, properties?: Object): void;
        }
        
        interface Request extends Base, Koa.Request {
            header: Object;
            headers: Object;
            method: string;
            lenght: number;
            url: string;
            originalUrl: string;
            href: string;
            path: string;
            querystring: string;
            search: string;
            host: string;
            hostname: string;
            type: string;
            charset: string;
            query: Object;
            fresh: boolean;
            stale: boolean;
            protocol: string;
            secure: boolean;
            ip: string;
            ips: Array<string>;
            subdomains: Array<string>;
            idempotent: any;
            socket: any;
            
            is(...types: Array<string>): string;
            
            accepts(types: Array<string>): string
            accepts(...types: Array<string>): string
            
            acceptsEncodings(): Array<string>;
            acceptsEncodings(encodings: Array<string>): string;
            acceptsEncodings(...encodings: Array<string>): string;
            
            acceptsCharsets(): Array<string>;
            acceptsCharsets(charsets: Array<string>): string;
            acceptsCharsets(...charsets: Array<string>): string;
            
            acceptsLanguages(): Array<string>;
            acceptsLanguages(langs: Array<string>): string;
            acceptsLanguages(...langs: Array<string>): string;
            
            get(field: string): any;
        }
        
        interface Response extends Base, Koa.Response {
            header: Object;
            socket: any;
            status: number;
            message: string;
            lenght: number;
            body: string;
            type: string;
            headerSent: boolean;
            lastModified: Date;
            etag: string;
            
            get(field: string): any;
            set(field: string, value: any): void;
            remove(field: string): void;
            vary(field: string): void;
            
            is(...types: Array<string>): string;
            
            redirect(url: string, alt?: string): void;
            attachment(filename?: string): void;
        }
        
        interface Koa extends Application {
            
        }
    }
    
    export = koa;
}
