"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var prisma = new client_1.PrismaClient();
function createPermision(type, subject, action) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, item;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(action == 'manage')) return [3 /*break*/, 5];
                    _i = 0, _a = ['manage', 'read', 'create', 'update', 'delete'];
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    item = _a[_i];
                    return [4 /*yield*/, prisma.permision.create({
                            data: { subject: subject, action: item, type: type }
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, prisma.permision.create({
                        data: { subject: subject, action: action, type: type }
                    })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var centralPermisions, sellerPermisions, documentTypes, password, centralUser, paymentMethod;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.permision.findMany({
                        where: { type: 'CENTRAL' }
                    })];
                case 1:
                    centralPermisions = _a.sent();
                    if (!((centralPermisions === null || centralPermisions === void 0 ? void 0 : centralPermisions.length) == 0)) return [3 /*break*/, 34];
                    return [4 /*yield*/, createPermision('CENTRAL', 'centralLog', 'manage')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'userLog', 'manage')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'ip', 'manage')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'user', 'manage')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'centralUser', 'manage')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'country', 'manage')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'currency', 'manage')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'speciality', 'manage')];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'businessType', 'manage')];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'documentType', 'manage')];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'document', 'manage')];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'role', 'manage')];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'mediaFile', 'manage')];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'payoutMethod', 'manage')];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'payoutMethodName', 'manage')];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'electronicBankPayout', 'manage')];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'transferBankPayout', 'manage')];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'moneyTransferPayout', 'manage')];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'friendsInvitation', 'manage')];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'fieldsUpdate', 'manage')];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'usageGuide', 'manage')];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'usageGuideCategory', 'manage')];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'notification', 'manage')];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'supportTicket', 'manage')];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'SupportTicketDepartment', 'manage')];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'shop', 'manage')];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'product', 'manage')];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'usageGuide', 'manage')];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'usageGuideCategory', 'manage')];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'notification', 'manage')];
                case 31:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'supportTicket', 'manage')];
                case 32:
                    _a.sent();
                    return [4 /*yield*/, createPermision('CENTRAL', 'SupportTicketDepartment', 'manage')];
                case 33:
                    _a.sent();
                    _a.label = 34;
                case 34: return [4 /*yield*/, prisma.permision.findMany({
                        where: { type: 'USER' }
                    })];
                case 35:
                    sellerPermisions = _a.sent();
                    if (!((sellerPermisions === null || sellerPermisions === void 0 ? void 0 : sellerPermisions.length) == 0)) return [3 /*break*/, 38];
                    return [4 /*yield*/, createPermision('USER', 'shop', 'manage')];
                case 36:
                    _a.sent();
                    return [4 /*yield*/, createPermision('USER', 'product', 'manage')];
                case 37:
                    _a.sent();
                    _a.label = 38;
                case 38: return [4 /*yield*/, prisma.documentType.findMany()];
                case 39:
                    documentTypes = _a.sent();
                    if (!((documentTypes === null || documentTypes === void 0 ? void 0 : documentTypes.length) === 0)) return [3 /*break*/, 41];
                    return [4 /*yield*/, prisma.documentType.create({
                            data: {
                                isAllCountries: true,
                                name: {
                                    en: 'Government Issued ID',
                                    ar: 'هوية شخصية صادرة عن الحكومة'
                                },
                                description: {
                                    en: 'Government Issued ID',
                                    ar: 'هوية شخصية صادرة عن الحكومة'
                                },
                                centralNotes: 'note '
                            }
                        })];
                case 40:
                    _a.sent();
                    _a.label = 41;
                case 41: return [4 /*yield*/, (0, bcrypt_1.hash)('123456', 10)];
                case 42:
                    password = _a.sent();
                    return [4 /*yield*/, prisma.centralUser.findFirst()];
                case 43:
                    centralUser = _a.sent();
                    if (!!centralUser) return [3 /*break*/, 46];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'baraa',
                                email: 'baraa@email.com',
                                password: password,
                                isConfirmedSignup: true,
                                isVerifiedPasswordGenerationToken: true
                            }
                        })];
                case 44:
                    _a.sent();
                    return [4 /*yield*/, prisma.centralUser.create({
                            data: {
                                name: 'baraa',
                                email: 'baraa@email.com',
                                password: password,
                                is_super_admin: true,
                                isVerifiedVerificationSecret: true
                            }
                        })];
                case 45:
                    _a.sent();
                    _a.label = 46;
                case 46: return [4 /*yield*/, prisma.paymentMethod.findMany()];
                case 47:
                    paymentMethod = _a.sent();
                    if (!(paymentMethod.length == 0)) return [3 /*break*/, 49];
                    return [4 /*yield*/, prisma.paymentMethod.create({
                            data: {
                                paypalTransactionPercentFees: 0,
                                paypalTransactionFixedFees: 0,
                                cardTransactionPercentFees: 0,
                                cardTransactionFixedFees: 0,
                                sadidTransactionPercentFees: 0,
                                sadidTransactionFixedFees: 0,
                                isDefault: true
                            }
                        })];
                case 48:
                    _a.sent();
                    _a.label = 49;
                case 49: return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) { return console.error(e); })["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
