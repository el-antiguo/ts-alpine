export function RegisterComponent(...arg) {
    return function (target) {
        const className = target.name;
        window[className] = function (attributes) {
            const instance = new target(...arg);
            setAttributes(instance, attributes);
            injectInitMethod(instance);
            exposeMethods(instance);
            return instance;
        };
    };
}
function setAttributes(instance, attributes) {
    Object.assign(instance, attributes);
}
function injectInitMethod(instance) {
    const oldInit = instance.init;
    Object.defineProperty(instance, 'init', {
        value: function () {
            const self = Object.getPrototypeOf(instance);
            self.$watchers?.(this);
            self.$eventListeners?.(this);
            oldInit?.();
        }
    });
}
function exposeMethods(instance) {
    const excludeMethods = ['constructor', 'init'];
    const methods = Reflect.ownKeys(Object.getPrototypeOf(instance))
        .filter((key) => !key.startsWith('$')
        && !excludeMethods.includes(key));
    methods.forEach(key => {
        Object.defineProperty(instance, key, {
            value: instance[key],
        });
    });
}
//# sourceMappingURL=RegisterComponent.js.map