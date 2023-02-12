import Docker, {ContainerInfo} from 'dockerode';

const docker = new Docker();

export async function checkForRunningContainer(containerName: string): Promise<boolean> {
    let runningContainers: Array<ContainerInfo> = await docker.listContainers();

    return runningContainers.some((container: ContainerInfo) => {
        if (container.Names.includes(`/${containerName}`)) {
            if (container.State === "running") {
                return true;
            }
        }
        return false;
    }
    );
}
