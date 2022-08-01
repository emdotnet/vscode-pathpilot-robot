import Dockerode from 'dockerode';

const dockerode = require('dockerode'); /* TODO: This is ugly!
                                           Try to solve the issue so than only
                                           one declaration or import suffice */

const docker = new dockerode();

export async function checkForRunningContainer(containerName: string): Promise<boolean> {
    let runningContainers: Array<Dockerode.ContainerInfo> = await docker.listContainers();

    return runningContainers.some((container: Dockerode.ContainerInfo) => {
        if (container.Names.includes(`/${containerName}`)) {
            if (container.State === "running") {
                return true;
            }
        }
        return false;
    }
    );
}
