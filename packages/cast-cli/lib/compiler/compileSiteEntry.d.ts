import type { Compiler } from 'webpack';
export declare function getExampleRoutePath(examplePath: string): string;
export declare function getComponentDocsRoutePath(componentDocsPath: string): string;
export declare function getRootDocsRoutePath(rootDocsPath: string): string;
export declare function findRootDocsPaths(): Promise<string[]>;
export declare function buildMobileSiteRoutes(): Promise<void>;
export declare function buildPcSiteRoutes(): Promise<void>;
export declare function buildSiteEntry(): Promise<void>;
export declare class CastSitePlugin {
    apply(compiler: Compiler): void;
}
