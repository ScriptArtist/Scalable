# Scalable
Makes the UI elements scalable to fit inside the container area.

### Demo
[Live examples][github_link]

![Demo](https://scriptartist.github.io/Scalable/images/demo1.gif)

[github_link]:https://scriptartist.github.io/Scalable/#demo

### Install

```sh
npm install scalable --save
```

### Usage

```sh
var scalable = new Scalable(containerEl, options);
```

### Options
+ `align`: `left | center | right` Horizontal alignment of an element. `default: left`
+ `verticalAlign`: `top | center | bottom` Vertical alignment of an element. `default: top`
+ `containerHeight`: `fixed | auto` Behaviorur of container height property  `default: fixed`
  + `fixed` - The element fits inside the container.
  + `auto` - Enlargement of the element increases the height of the container.
+ `minWidth`: Minimum width of an element.
+ `maxWidth`: Maximum width of an element.
+ `minScale`: Minimum scale of an element.
+ `maxScale`: Maximum width of an element.
