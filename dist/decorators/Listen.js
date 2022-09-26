export function Listen(listen) {
    return function (target, watched) {
        const oldMethod = target.$eventListeners;
        Object.defineProperty(target, '$eventListeners', {
            value: function (self) {
                oldMethod?.(self);
                self.$el.addEventListener(listen, (event) => self[watched](event));
            },
            configurable: true
        });
    };
}
//# sourceMappingURL=Listen.js.map