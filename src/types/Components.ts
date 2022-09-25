import { Component } from '../components'

export interface ComponentInterface {
    /** Alpine Compatibility layer */
    $el: AlpineElement
    $refs: { [name: string]: AlpineElement }
    $event: Event
    $dispatch(event: string, data: object): void
    $nextTick(callback: (_: any) => void): void
    $watch(property: string, callback: (value: any) => void): void;

    /** ts-Alpine compatibility layer */
    init?(...args: any[]): void
}

export declare interface ComponentController {
    $el: AlpineElement;
    $data: any;
    $nextTickStack: CallableFunction[];
    $showDirectiveStack: any[];
    $watchers: { [name: string]: CallableFunction };
    unobservedData: Component;
    getUnobservedData: () => Component;
    updateElements: (rootEl: AlpineElement, extraVars?: () => void) => void;
    updateElement: (el: AlpineElement, extraVars?: () => void) => void;
    evaluateReturnExpression: (
        el: AlpineElement,
        expression: string,
        extraVars?: () => void
    ) => void;
    [key: string]: any;
}

export interface AlpineElement extends HTMLElement {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __x: ComponentController;
    [key: string]: any;
}
