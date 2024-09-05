import j2s from "joi-to-swagger";
import * as path from "path";
import { schemaKey } from "./middleware/validateBody.js";
import { controllerKey } from "./middleware/ctrlWrapper.js";

/**
 * This function generates an OpenAPI specification for the given Express application.
 * It traverses the application routes and generates a specification based on the route validation.
 * @param {Express.Application} app
 */
export function generateOpenApi(app) {
    const apiComponents = {};

    function collectRoutes(stack, basePath = "/") {
        const layers = stack.filter(layer => layer.name === "router");
        const controllers = stack.filter(layer => layer.name === "bound dispatch");

        const routes = layers.flatMap(layer => {
            const nextPath = getPathFromRegex(layer.regexp);
            return collectRoutes(layer.handle.stack, path.join(basePath, nextPath));
        });

        const apis = controllers
            .filter(layer => layer.route)
            .flatMap(layer => {
                const nextPath = layer.route.path;
                const methods = layer.route.methods;

                const layers = layer.route.stack.filter(layer => layer.name === "func" && layer.handle[schemaKey]);
                const controller = layer.route.stack.find(layer => layer.handle[controllerKey]);
                let bodyDefinition;
                if (layers.length === 1) {
                    const schema = layers[0].handle[schemaKey];
                    const { swagger, components } = j2s(schema, apiComponents);
                    mergeComponents(apiComponents, components);
                    bodyDefinition = swagger;
                }
                return Object.keys(methods).map(method => ({
                    path: path.join(basePath, nextPath),
                    method,
                    operationId: controller.handle.name,
                    bodyDefinition,
                }));
            });

        return routes.concat(apis);
    }

    const routes = collectRoutes(app._router.stack);

    return convertRoutesToOpenApi(routes, apiComponents);
}

function convertRoutesToOpenApi(routes, apiComponents) {
    return {
        openapi: "3.0.2",
        paths: routes.reduce((acc, route) => {
            acc[route.path] = {
                [route.method.toLowerCase()]: {
                    description: route.operationId,
                    operationId: route.operationId,
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: route.bodyDefinition,
                            },
                        },
                    },
                },
            };
            return acc;
        }, {}),
        components: apiComponents,
    };
}

const pathRegex = /^.*?(?<=\/?)(\w+)(?=\/?).*?$/i;
function getPathFromRegex(regex) {
    const match = regex.source.match(pathRegex);
    return match ? match[1] : "";
}

/**
 * this function merge top level properties but replace nested properties
 */
function mergeComponents(target, source) {
    for (const [key, value] of Object.entries(source)) {
        assert.ok(typeof value === "object" && value !== null);

        let store = target[key];
        if (!store) {
            store = target[key] = {};
        }

        for (const [subKey, subValue] of Object.entries(value)) {
            store[subKey] = subValue;
        }
    }
}
