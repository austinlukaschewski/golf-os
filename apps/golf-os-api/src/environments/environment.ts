export const environment = Object.freeze({
    production: false,
    app: {
        globalPrefix: process.env['APP_GLOBAL_PREFIX'],
        port: process.env['APP_PORT'],
    },
});
