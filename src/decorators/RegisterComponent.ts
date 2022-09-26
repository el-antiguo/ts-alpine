import { ComponentInterface } from '../types'

export function RegisterComponent(...arg: any[]) {
    return function (target: any) {
        const className: string = target.name

        window[className] = function (attributes: {[key:string]:any}) {
            const instance = new target(...arg)

            setAttributes(instance, attributes)
            injectInitMethod(instance)
            exposeMethods(instance)

            return instance
        }
    }
}

function setAttributes(instance: ComponentInterface, attributes: {[key:string]:any}): void {
    Object.assign(instance, attributes)
}

function injectInitMethod(instance: ComponentInterface) {
    const oldInit = instance.init

    Object.defineProperty(instance, 'init', {
        value: function () {
            const self = Object.getPrototypeOf(instance)

            self.$watchers?.(this)
            self.$eventListeners?.(this)

            oldInit?.()
        }
    })
}

function exposeMethods(instance: any) {
    const excludeMethods = ['constructor', 'init']
    const methods = Reflect.ownKeys(Object.getPrototypeOf(instance))
        .filter((key: any) => !key.startsWith('$')
            && !excludeMethods.includes(key)
        )
    methods.forEach(key => {
        Object.defineProperty(instance, key, {
            value: instance[key],
        })
    });
}
