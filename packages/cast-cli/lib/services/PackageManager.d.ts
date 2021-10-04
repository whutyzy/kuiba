declare type PackageManagerName = 'yarn' | 'npm';
declare class PackageManager {
    context: string;
    _registries: {
        [propertName: string]: any;
    };
    bin: PackageManagerName;
    constructor(context: string, packageManager: PackageManagerName);
    setRegistry(): Promise<any>;
    runCommand(command: string, args?: any[]): Promise<void>;
    install(): Promise<void>;
}
export default PackageManager;
