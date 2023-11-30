"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
export default function IfDecorator(condition, decorator) {
    return (...args) => {
        if (condition) {
            return decorator(...args);
        }
    };
}
//# sourceMappingURL=if.decorator.js.map
