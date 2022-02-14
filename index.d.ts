declare interface User {
    username: string,
    id: string
}

declare interface application {
    name: string,
    description: string,
    id: string,
    website: string,
    redirectURI: string
}

declare class api {
    constructor(id: string, token: string);
    id: string;
    token: string;
    setToken(token: string): api;
    setID(id: string): api;
    getUser(secret: string): Promise<User>;
    getInfos(id: string): Promise<application>;
}

export = api;
