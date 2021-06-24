//https://dev.to/marinovicmarko/preloading-blog-post-content-f8a#:~:text=When%20preload%20is%20initiated%2C%20factory,lazy%20component.
import { lazy, createElement } from "react";

const lazyWithPreload = (factory) => {
  let LoadedComponent;

  const LazyComponent = lazy(factory);

  const loadComponent = () =>
    factory().then((module) => {
      LoadedComponent = module.default;
    });

  const Component = (props) => createElement(LoadedComponent || LazyComponent, props);

  Component.preload = () => loadComponent();

  return Component;
};

export default lazyWithPreload;
