"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const URLController_1 = require("./controller/URLController");
const mongoConnection_1 = require("./DATABASE/mongoConnection");
const api = (0, express_1.default)();
api.use(express_1.default.json());
const database = new mongoConnection_1.MongoConnection();
database.connect();
const urlController = new URLController_1.URLController();
api.post('/shorter', urlController.shorter);
api.get('/:hash', urlController.redirect);
api.listen(5000, () => {
    console.log('Express NOT Listening...');
});
//# sourceMappingURL=index.js.map