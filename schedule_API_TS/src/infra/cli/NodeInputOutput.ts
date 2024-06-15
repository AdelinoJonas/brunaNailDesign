import InputOutputHandler from "./InputOutputHandler";

export default class NodeInputOutput  extends InputOutputHandler{
    constructor (){
        super();
        process.stdin.on("data", async (chunck) => {
            const command = chunck.toString().replace(/\n/g,"");
            await this.type(command);
        });
    }
    write(text: string): void {
        process.stdout.write(`${text}\n`);
    }
}