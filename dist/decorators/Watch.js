export function Watch(fire) {
    return function (target, watched) {
        const oldMethod = target.$watchers;
        Object.defineProperty(target, '$watchers', {
            value: function (self) {
                oldMethod?.(self);
                self.$watch(watched, (value) => self[fire](value));
            },
            configurable: true
        });
    };
}
//# sourceMappingURL=Watch.js.map