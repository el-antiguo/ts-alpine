export function Listen(listen: string) {
    return function (target: any, watched: string) {
        const oldMethod = target.$eventListeners

        Object.defineProperty(target, '$eventListeners', {
            value: function(self:any) {
                oldMethod?.(self)

                self.$el.addEventListener(listen, (event: any) => self[watched](event));
            },
            configurable: true
        })
    }
}
