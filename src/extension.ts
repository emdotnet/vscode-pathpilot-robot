import * as vscode from "vscode";
import * as command from './commands';
import { getVSCodeRemoteInfo, RuntimeExtensionKind } from './extensionEnvironment';

export function activate(context: vscode.ExtensionContext) {
	const extensionEnvironment = getVSCodeRemoteInfo(context.extension);

	vscode.commands.executeCommand('setContext', 'tormachContext.outsideRobotEnvironment', extensionEnvironment.extensionKind === RuntimeExtensionKind.local);


	context.subscriptions.push(vscode.commands.registerCommand('pathpilot-robot.connectToRunningRobotContainer', async () => {
		try {
			if (extensionEnvironment.extensionKind !== RuntimeExtensionKind.local) {
				throw new Error('Not possible to run the command "connectToRunningRobotContainer" in current context');
			}
			await command.connectToRunningRobotContainer(context.globalStorageUri);
		} catch (e) {
			if (e instanceof Error) {
				vscode.window.showErrorMessage(e.message);
			}
			else {
				throw e;
			}
		}
	}));


	context.subscriptions.push(vscode.commands.registerCommand('pathpilot-robot.launchPathPilotRobot', async () => {
		vscode.window.showInformationMessage('Launching PathPilot Robot!');

		try {
			if (extensionEnvironment.extensionKind !== RuntimeExtensionKind.local) {
				throw new Error('Not possible to run the command "launchPathPilotRobot" in current context');
			}
			await command.launchPathPilotRobot();
		} catch (e) {
			if (e instanceof Error) {
				vscode.window.showErrorMessage(e.message);
			}
			else {
				throw e;
			}
		}
	}));

}

export function deactivate() { }
