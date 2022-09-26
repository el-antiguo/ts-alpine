# About Alpine.ts

Alpine.ts is an implementation of Alpine.js in typescript. which allows easy creation and registration of alpinejs components

Alpine.ts consists of a series of decorators that allow you to register components and simplify the implementation of certain alpine features such as watchers and events within the component in an easy way.

**define component**
``` ts
import { Component, RegisterComponent, Watch } from 'ts-alpine'

@RegisterComponent()
export class Modal extends Component {
    @Watch('autoTogle')
    public showModal: boolean = false

    ...
}
```

**usage**

``` html
<div
    x-data="Modal({showModal:true})"
    x-cloak
    x-on:keydown.escape="showModal = false"
>
    ...
</div>
```

## Installation

to use this package it is not necessary to have previously installed the alpine.js package

**npm**
```
npm install --save-dev ts-alpine
```

**yarn**
```
yarn add -D ts-alpine
```

# Usage
## Start alpine

To start  alpinejs import `Start` from `ts-alpine` package after import all you components

This function automatically imports alpinejs and starts it in the window object, but because alpinejs automatically registers new components from the window object, it is necessary to first import all components and then start alpine

```ts
import './components'
import {Start} from 'ts-alpine'

Start()

```

is also posible to import alpine object from `ts-alpine`

```ts
import './components'
import {Alpine} from 'ts-alpine'

window.Alpine = Alpine
Alpine.start()
```

## Extends Component

to avoid compiler errors by using the properties that alpine.js injects into the object, extend the `Component` class provided by alpine.ts

``` ts
import { Component, RegisterComponent } from 'ts-alpine'

@RegisterComponent()
export class MyComponent extends Component {
    public userName: string
    ...
    
    public init(): void {
        this->userName = $store.user.name
    }
    
    ...
}
```

## Register new component


To register a class as new component is necessary to use the decorator `RegisterComponent` in the object definition

```ts
import { RegisterComponent } from 'ts-alpine'

@RegisterComponent()
export class MyComponent {
    ...
}
```

This decorator automatically instantiate, inject config and register object in window component

## Passing configuration to component

when calling components it is possible to pass change the initial state of the attributes as an object in the component's attribute

```html
<div
    x-data="Modal({showModal:true})"
    x-cloak
    x-on:keydown.escape="showModal = false"
>
    ...
</div>
```

## Dealing with constructor

Due to how alpine js injects methods into the object, constructors cannot access alpine js methods. if you need to call some alpine methods when the object is initialized, use the init method. also to pass arguments to the Constructor component wen instantiate use the arguments in the `RegisterComponent` decorator

```ts
import { RegisterComponent } from 'ts-alpine'
import { logger } from '../utils'

@RegisterComponent(
    ['create', 'save'],
    logger,
)
export class MyComponent {
    constructor(
        public readonly actions:string[],
        public readonly logger,
    ){ }

    ...
}
```

DI support is planned for the future

Finally, despite the fact that injecting dependencies is a powerful tool, do not forget that the idea of alpinejs is to keep objects simple, so use this feature with moderation

##  Dealing with init methods

alpine.ts needs to inject code into the init method to properly initialize some decorators. this means that even if the init method is not defined it will still exist in the object if some decorators are used. In addition, because code is injected into the init method, when the user defines the init method, the user's code will be executed first and the alpine.ts code

# Decorators
## Watchers

To bind a method to a property change, you can use the `Watch` decorator where the argument is the name of the method to call when the property changes.

```ts
import { RegisterComponent, Watch } from 'ts-alpine'

@RegisterComponent()
export class MyComponent {
    @Watch('logger')
    public toWatch:boolean = false
    ...

    private logger(value:boolean): void {
        console.log(value);
    }
}
```

this decorator is the same as:
```js 
{
    toWatch:false,
    init: () => {
        this.$watch('toWatch', (value) => this.logger(value))
    },
    logger: (value) => {
        console.log(value);
    }
}
```

## Events listeners

To bind a method to a browser event, use the `Listen` decorator where the argument is the name of the event

```ts
import { RegisterComponent, Listen } from 'ts-alpine'

@RegisterComponent()
export class logger {
    @Listen('log:info')
    private info({detail}): void {
        console.log('[info]', detail);
    }
    @Listen('log:error')
    private error({detail}): void {
        console.log('[error]', detail);
    }
}
```