import * as vscode from 'vscode';
import { checkForRunningContainer } from '../containers';
import { pathpilotRobotROSContainerName, remoteContainersExtensionID, remoteContainersAttachCommand } from '../constants';
import { activateExtension } from '../extensions';
import { env } from 'node:process';
import * as fs from 'fs/promises';

const baseConfig = {
    "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance",
        "ms-toolsai.jupyter",
        "ms-toolsai.jupyter-keymap",
        "ms-toolsai.jupyter-renderers",
        "ms-vscode.vscode-js-profile-table"
    ],
    "workspaceFolder": `${env.HOME}/nc_files/robot_programs`,
    "userEnvProbe": "interactiveShell",
    "remoteUser": env.USER
};

async function installContainerConfig(configUri: vscode.Uri) {
    const remoteConfigsPath = vscode.Uri.joinPath(configUri, `../${remoteContainersExtensionID}/nameConfigs`);

    await fs.mkdir(remoteConfigsPath.fsPath, { recursive: true });

    let rosConfig = vscode.Uri.joinPath(remoteConfigsPath, `${pathpilotRobotROSContainerName}.json`);

    await fs.writeFile(rosConfig.fsPath, JSON.stringify(baseConfig, null, 2), 'utf-8');
};

export async function connectToRunningRobotContainer(configUri: vscode.Uri) {
    if (!await checkForRunningContainer(pathpilotRobotROSContainerName)) {
        throw new Error('PathPilot Robot is not running!');
    }

    await activateExtension(remoteContainersExtensionID);

    await installContainerConfig(configUri);

    try {
        vscode.commands.executeCommand(remoteContainersAttachCommand, pathpilotRobotROSContainerName);
    }
    catch {
        throw new Error("Could not connect to the PathPilot Robot container even through it is running!");
    }
}
