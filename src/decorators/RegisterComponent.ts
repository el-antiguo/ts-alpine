import { ComponentInterface } from '../types'

export function RegisterComponent(...arg: any[]) {
    return function (target: any) {
        const className: string = target.name

        window[className] = function (attributes: {[key:string]:any}) {
            const instance = new target(...arg)

            SetAttributes(instance, attributes)
            InjectInitMethod(instance)
            ExposeMethods(instance)

            return instance
        }
    }
}

function SetAttributes(instance: ComponentInterface, attributes: {[key:string]:any}): void {
    Object.assign(instance, attributes)
}

function InjectInitMethod(instance: ComponentInterface) {
    const oldInit = instance.init

    Object.defineProperty(instance, 'init', {
        value: function () {
            const self = Object.getPrototypeOf(instance)

            self.$watchers?.(this)
            self.$eventListeners?.(this)

            oldInit?.()
        },
    })
}

function ExposeMethods(instance: any) {
    const excludeMethods = [ 'constructor', 'init' ]
    const methods = Reflect.ownKeys(Object.getPrototypeOf(instance))
        .filter((key: any) => !key.startsWith('$')
            && !excludeMethods.includes(key)
        )
    methods.forEach(key => {
        Object.defineProperty(instance, key, {
            value: instance[key],
        })
    })
}
