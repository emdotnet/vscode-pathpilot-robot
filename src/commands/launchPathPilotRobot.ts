import { checkForRunningContainer } from '../containers';
import { pathpilotRobotLauncherContainerName, pathpilotRobotROSContainerName } from '../constants';
import { exec } from 'node:child_process';

export async function launchPathPilotRobot() {
    if (await checkForRunningContainer(pathpilotRobotLauncherContainerName)) {
        if (await checkForRunningContainer(pathpilotRobotROSContainerName)) {
            throw new Error('PathPilot Robot is already running!');
        }
        else {
            throw new Error('PathPilot Robot is starting, please, check the PathPilot Robot Launcher!');
        }
    }

    exec('launch-pathpilot-launcher');
}
