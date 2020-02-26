const fs = require("fs");
const path = require("path");

export const GetDirFiles = (link: string) => {
    const result: string[] = [];
    if (fs.existsSync(link)) {
        fs.readdirSync(link).forEach((entry: string) => {
            const ipath = path.join(link, entry);
            if (!fs.lstatSync(ipath).isDirectory()) {
                result.push(ipath);
            }
        });
    }
    return result;
}

export const RemoveDirReq = (link: string) => {
    if (fs.existsSync(link)) {
        fs.readdirSync(link).forEach((entry: string) => {
            const ipath = path.join(link, entry);
            if (fs.lstatSync(ipath).isDirectory()) {
                RemoveDirReq(ipath);
            } else {
                fs.unlinkSync(ipath);
            }
        });
        fs.rmdirSync(link);
    }
}
