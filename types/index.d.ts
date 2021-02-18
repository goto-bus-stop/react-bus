import React, { FC, ReactNode } from 'react';
import { Emitter, EventType, Handler } from 'mitt';
export declare const BusContext: React.Context<Emitter | null>;
/**
 * Return the event emitter.
 *
 * @export
 * @return {*}
 */
export declare function useBus(): Emitter;
/**
 * Attach an event listener to the bus while this component is mounted. Adds the listener after mount, and removes it before unmount.
 *
 * @export
 * @param {string} name
 * @param {Handler} fn
 */
export declare function useListener<T = any>(name: EventType, fn: Handler<T>): void;
export interface ProviderProps {
    children?: ReactNode;
}
/**
 * Create an event emitter that will be available to all deeply nested child elements using the useBus() hook.
 *
 * @export
 * @param {ProviderProps} { children }
 * @return {*}
 */
export declare const Provider: FC<ProviderProps>;
