export default interface HttpServer {
    on(method: string, url: string, callback: Function): void;
    use(url: string, middleware: any): void;
    listen(port: number): void;
}