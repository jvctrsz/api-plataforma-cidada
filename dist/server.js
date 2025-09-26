"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./Docs/swagger");
const zod_1 = __importDefault(require("zod"));
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const cors_1 = __importDefault(require("cors"));
const secretariatsRoutes_1 = __importDefault(require("./Routes/secretariatsRoutes"));
const requestRoutes_1 = __importDefault(require("./Routes/requestRoutes"));
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.default);
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://order-control-gamma.vercel.app", "http://localhost:000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.openApiDocJWT, {
    customSiteTitle: "Order Control",
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
}));
app.use("/api", userRoutes_1.default);
app.use("/api", authRoutes_1.default);
app.use("/api", secretariatsRoutes_1.default);
app.use("/api", requestRoutes_1.default);
app.listen(port, () => {
    console.log("servidor rodando em http://localhost:3000");
});
exports.default = app;
