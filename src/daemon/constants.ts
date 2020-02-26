import express from "express";
import { DaemonExpressOptions, METHOD } from "../Lib/base/types";

export interface DaemonInterface {
    monitoring: (req: express.Request, res: express.Response) => void;
    applications: (req: express.Request, res: express.Response) => void;
    application: (req: express.Request, res: express.Response) => void;
    status: (req: express.Request, res: express.Response) => void;
    command: (req: express.Request, res: express.Response) => void;
}

/**
 * express links controllers
 */
export enum CONTROLLERS {
    MONITORING = "monitoring",
    APPLICATIONS = "applications",
    APPLICATION = "applications/:id",
    STATUS = "monitoring/:id",
    COMMAND = "/:id/:cmd"
}

export const APPLICATIONS: DaemonExpressOptions<CONTROLLERS>[] = [
    { link: CONTROLLERS.MONITORING, func: "monitoring", method: METHOD.GET },
    { link: CONTROLLERS.APPLICATIONS, func: "applications", method: METHOD.GET },
    { link: CONTROLLERS.APPLICATION, func: "application", method: METHOD.GET },
    { link: CONTROLLERS.STATUS, func: "status", method: METHOD.GET },
    { link: CONTROLLERS.COMMAND, func: "command", method: METHOD.POST }
];
