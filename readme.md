<h1 align="center">Respo – Responsive React Component</h1>

<div align="center">
  A simple way to make React Components responsive.
</div>

<hr />

[See an example](https://codesandbox.io/s/ooyjzqojv9)

The Responsive component measures it's children and allows you to change their contents and layout based on the size so that it can show different states for different sizes. This is great if you'd like to have the same component work on devices with different screen sizes.

It is loosely based on the idea of [element queries](https://tomhodgins.github.io/element-queries-spec/element-queries.html), which is a better alternative to media queries, as it allows you to respond based on elements, not just on the window. It uses the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) api for high performance, with a fallback to [polyfill](https://www.npmjs.com/package/resize-observer-polyfill).

### Install

Install the Respo package to your project.

```
$ yarn add respo
```

Import the Responsive component into your project.

```.tsx
import { Responsive } from "respo"
```

### Usage

The `Responsive` component takes a render prop and it passes a:

- `size` containing `{width: number, height: number}`
- `device` that can be `screen`, `tablet` or `mobile` based on width

```.tsx
<Responsive>
    {(size, device) => (
    <div style={style}>
        {size.width} x {size.height} {device}
    </div>
    )}
</Responsive>
```

### Issues

- It does not work wel with the `height` of `absolute` or `fixed` elements, because they don't resize their parent `div`.
- If the polyfill kicks in, too many `Responsive` components could impact page resize performance, but it should be able to handle a lot on modern browsers.
