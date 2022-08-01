//import * as fs from 'node:fs/promises';
import { checkForRunningContainer } from '../containers';
import { pathpilotRobotLauncherContainerName, pathpilotRobotROSContainerName } from '../constants';
import { exec } from 'node:child_process';

export async function launchPathPilotRobot() {
    if (await checkForRunningContainer(pathpilotRobotLauncherContainerName)) {
        console.log("1.5");
        if (await checkForRunningContainer(pathpilotRobotROSContainerName)) {
            console.log("1");
            throw new Error('PathPilot Robot is already running!');
        }
        else {
            console.log("2");
            throw new Error('PathPilot Robot is starting, check the PathPilot Robot Launcher!');
        }
    }

    console.log("3");

    exec('launch-pathpilot-launcher');
}
