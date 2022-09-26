import '../types'
import Alpine from 'alpinejs'

export { Alpine }

export function Start () {
    window.Alpine = Alpine
    Alpine.start()
}
