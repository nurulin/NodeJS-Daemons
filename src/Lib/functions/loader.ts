import Base from "./baseClass";

export const Loader = (app: Base, port: string) => {
    app.express.listen(port, (err: string) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        return console.log(`server is listening on ${port}`)
    });
}
