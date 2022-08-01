import * as vscode from 'vscode';

export async function installExtension(extensionID: string) {
    await vscode.commands.executeCommand('workbench.extensions.installExtension', extensionID);

    let extension: vscode.Extension<any> | undefined;

    // Determined by Trial&Error, it seems that the 'vscode.commands.executeCommand'
    // awaitable returns sooner that the 'vscode.extensions.getExtension' is able
    // to find it. This is unfortunate, but is solvable by adding up to 10 seconds
    // wait.
    for (let i = 0; i < 5; i++) {
        extension = vscode.extensions.getExtension(extensionID);
        if (extension) {
            break;
        }
        await new Promise((f) => setTimeout(f, 2000));
    }

    if (!extension) {
        throw new Error(`Extension ${extensionID} could not be installed!`);
    }

    return extension;
}

export async function activateExtension(extensionID: string) {
    let extension: vscode.Extension<any> | undefined = vscode.extensions.getExtension(extensionID);

    if (!extension) {
        extension = await installExtension(extensionID);
    }

    if (extension.isActive === false) {
        extension.activate().then(
            function () {
                console.log(`Extension ${extension?.id} activated`);
            },
            function () {
                throw new Error(`Activation of extension ${extension?.id} failed!`);
            }
        );
    }

    // We don't care if the extension is already active
}
