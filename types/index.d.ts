/**
 * Return the event emitter.
 *
 * @return {import('mitt').Emitter}
 */
export function useBus(): import('mitt').Emitter;
/**
 * Attach an event listener to the bus while this component is mounted. Adds the listener after mount, and removes it before unmount.

 * @param {import('mitt').EventType} name
 * @param {import('mitt').Handler} listener
 */
export function useListener(name: import('mitt').EventType, listener: import('mitt').Handler): void;
/**
 * Create an event emitter that will be available to all deeply nested child elements using the useBus() hook.
 *
 * @param {{ children?: import('react').ReactNode }} props
 */
export function Provider({ children }: {
    children?: import('react').ReactNode;
}): JSX.Element;
export const BusContext: React.Context<import("mitt").Emitter | null>;
import React from "react";
