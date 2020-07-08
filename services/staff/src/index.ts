// Infra
import http from "http";
import { GraphQLServer } from "./shared/infra/http/graphql/apollo";
import app from "./shared/infra/http/app";
import "./shared/infra/repos/sequelize";

// Subscriptions
import "./modules/application/subscriptions";

// Apply apollo server to app
GraphQLServer(app);
// Start Server
const activedServer = http.createServer(app);
// Enable Websocket
// activateSocketIo(activedServer).listen(process.env.WEBSOCKET_PORT);
