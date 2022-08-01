import { ExtensionKind, env, Extension } from 'vscode';

export enum RuntimeExtensionKind {
    /**
     * Extension running in a remote environment
     */
    workspace = 'workspace',

    /**
     * Extension running in local environment, but remote enironment does exist
     */
    ui = 'ui',

    /**
     * No remote environment
     */
    local = 'local'
}

export enum RemoteKind {
    ssh = 'ssh',
    wsl = 'wsl',
    container = 'container',
    unknown = 'unknown'
}

export interface IVSCodeRemoteInfo {
    extensionKind: RuntimeExtensionKind;
    remoteKind: RemoteKind | undefined;
}

export function getVSCodeRemoteInfo(extension: Extension<any>): IVSCodeRemoteInfo {
    let extensionKind: RuntimeExtensionKind;
    let remoteKind: RemoteKind | undefined;

    const remoteName: string | undefined = env.remoteName;
    if (remoteName && extension) {
        switch (remoteName.toLowerCase()) {
            case 'ssh-remote':
                remoteKind = RemoteKind.ssh;
                break;
            case 'wsl':
                remoteKind = RemoteKind.wsl;
                break;
            case 'attached-container':
            case 'dev-container':
                remoteKind = RemoteKind.container;
                break;
            default:
                remoteKind = RemoteKind.unknown;
        }

        if (extension.extensionKind === ExtensionKind.UI) {
            extensionKind = RuntimeExtensionKind.ui;
        } else {
            extensionKind = RuntimeExtensionKind.workspace;
        }
    } else {
        extensionKind = RuntimeExtensionKind.local;
    }

    return {
        extensionKind,
        remoteKind
    };
}
