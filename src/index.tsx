// Based on https://github.com/ZeeCoder/react-resize-observer/blob/master/src/index.js

import * as React from "react";
import ResizeObserverPoly from "resize-observer-polyfill";

type Size = {
  width: number;
  height: number;
};

type Props = {
  children: (
    size: Size,
    deviceType: Device,
    ref: React.RefObject<HTMLDivElement>
  ) => React.ReactElement;
};

type Device = "desktop" | "tablet" | "mobile";

// https://stackoverflow.com/a/7354648
function deviceType(width: number): Device {
  if (width < 320) return "mobile";
  if (width < 961) return "tablet";
  return "desktop";
}

export class Responsive extends React.Component<Props, Size> {
  state = {
    width: 1,
    height: 1
  };

  ref = React.createRef<HTMLDivElement>();
  element: null | HTMLElement = null;
  resizeObserver: null | ResizeObserverPoly = null;

  observeIfNeeded() {
    const element = this.ref.current;

    if (element && this.element !== element) {
      // clean up after a previous element
      if (this.element) {
        this.unobserve(this.element);
      }

      // start observing the new element
      this.observe(element);
    }
  }

  observe(element: HTMLElement) {
    this.resizeObserver = new ResizeObserverPoly((entries: any) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }

      const entry = entries[0];

      if (!entry.contentRect) return;

      this.setState({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });

    this.resizeObserver.observe(element);
    this.element = element;
  }

  unobserve(element: HTMLElement) {
    if (!this.resizeObserver) return;
    this.resizeObserver.unobserve(element);
  }

  componentDidMount() {
    this.observeIfNeeded();
  }

  componentDidUpdate() {
    this.observeIfNeeded();
  }

  componentWillUnmount() {
    if (this.ref.current) {
      this.unobserve(this.ref.current);
    }
  }

  render() {
    const size = { width: this.state.width, height: this.state.height };
    return (
      <div ref={this.ref}>
        {this.props.children(size, deviceType(size.width), this.ref)}
      </div>
    );
  }
}
