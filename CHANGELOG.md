# react-bus change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## 4.0.1
* Fix ESM import resolution. (#38)

Thanks [@barasimumatik](https://github.com/barasimumatik)!

## 4.0.0
* Remove `BusContext` export. This is an implementation detail.
* Update to mitt 3.x.
* Add React 19 to the test matrix.

Version 3.0.0 also works fine with React 19. You don't need to update to get React 19 support.

## 3.0.0
* Add typescript types.
* Update to mitt 2.x, which requires that browsers support the `Map` API.
* Require React >= 17.

All of this thanks to [@achmadk](https://github.com/achmadk)!

## 2.0.1
* Remove `console.log`s.

## 2.0.0
* Remove `withBus()`.
* Add `useBus()` hook.
* Add `useListener()` hook.
* Require React >= 16.8.

## 1.0.3
* Add missing `react` peer dependency.

## 1.0.2
* Fix tests.
* Add missing ES modules build to published package.
