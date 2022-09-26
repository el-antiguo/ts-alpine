export function Watch(fire: any) {
    return function (target: any, watched: string) {
        const oldMethod = target.$watchers

        Object.defineProperty(target, '$watchers', {
            value: function (self: any) {
                oldMethod?.(self)

                self.$watch(watched, (value: any) => self[fire](value))
            },
            configurable: true,
        })
    }
}
