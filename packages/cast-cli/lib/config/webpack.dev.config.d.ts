import HtmlWebpackPlugin from 'html-webpack-plugin';
export declare const HTML_WEBPACK_PLUGINS: HtmlWebpackPlugin[];
export declare function getDevServerConfig(): {
    port: any;
    host: any;
    static: {
        directory: string;
    };
    allowedHosts: string;
    hot: boolean;
};
export declare function getDevConfig(): any;
