import { ComponentInterface, AlpineElement } from '../types';
export declare abstract class Component implements ComponentInterface {
    /** Alpine Compatibility layer */
    $el: AlpineElement;
    $refs: {
        [key: string]: AlpineElement;
    };
    $event: Event;
    $dispatch: (event: string, value: object) => void;
    $nextTick: (callback: (_: any) => void) => void;
    $watch: (property: string, callback: (value: any) => void) => void;
}
