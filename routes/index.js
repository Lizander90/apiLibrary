import apiRoutes from "./airequest.routes.js";

export function configRoutes(appRouter) {
    appRouter.use('/ialib/v1', apiRoutes)
}