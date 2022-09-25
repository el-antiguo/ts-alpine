import { ComponentInterface, AlpineElement } from '../types'

export abstract class Component implements ComponentInterface {
    /** Alpine Compatibility layer */
    public $el!: AlpineElement
    public $refs!: { [key: string]: AlpineElement }
    public $event!: Event
    public $dispatch!: (event: string, value: object) => void
    public $nextTick!: (callback: (_: any) => void) => void
    public $watch!: (property: string, callback: (value: any) => void) => void
}
