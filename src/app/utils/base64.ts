export class Base64Decode {

    // method for decode responses
    public decodeToJSON(encode: any): any {
        return JSON.parse(atob(encode));
    }

    public decode(encode: string) {
        return atob(encode);
    }

    public encode(toEncode: string) {
        return btoa(toEncode);  // string base  64
    }
}
