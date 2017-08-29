# gl-react-image ![](https://img.shields.io/npm/v/gl-react-image.svg) ![](https://img.shields.io/badge/gl--react-3-05F561.svg) ![](https://img.shields.io/badge/gl--react-dom%20%7C%20native-f90.svg)

[Universal](https://projectseptemberinc.gitbooks.io/gl-react/content/docs/universal.html) gl-react module **that implements [resizeMode prop](https://facebook.github.io/react-native/docs/image.html#resizemode)** in OpenGL.

[-> Example App <-](https://gl-react-image.surge.sh/)

The library is called `gl-react-image` but barely anything can be actually the source, it can be a video, a canvas, another stack of effects,... anything that gl-react support as a texture.

```sh
yarn add gl-react-image
```

```js
import GLImage from "gl-react-image";
import {Surface} from "gl-react-dom";// or "gl-react-native" or "gl-react-expo" or ..

<Surface ...>
  <GLImage
    source="http://i.imgur.com/tCatS2c.jpg"
    imageSize={{ width: 1024, height: 693 }}
    resizeMode="stretch"
  />
</Surface>
```

## `GLImage` Props

- `source` **(required)**: the texture input. It can be an image URL or anything gl-react supports for textures.
- `resizeMode`: `"cover" | "stretch" | "contain"` : This implement the exact same [React Native Image resizeMode prop](https://facebook.github.io/react-native/docs/image.html#resizemode) in OpenGL.
- `center` and `zoom` props can be used with `resizeMode=cover` to define the cover crop position:
  - `center`, an [x,y] array, defines the gravity of the crop *(x and y are in [0, 1] bound)*.
  - `zoom` should be a value in **] 0 , 1 ]** bound. 1 means no zoom, more value is close to 0, more the zoom is important.
- `width` and `height`: only provide if you also want a resize. (this is feeded to the gl-react Node width/height)

## Example

[-> Example App <-](https://gl-react-image.surge.sh/)

```html
<GLImage
  source="http://i.imgur.com/tCatS2c.jpg"
  resizeMode="stretch"
/>
```

alternative syntax is to use only `source` via a `{ uri, width, height }` object.

```html
<GLImage
  source="http://i.imgur.com/tCatS2c.jpg"
  resizeMode="stretch"
/>
```

```html
<GLImage
  source="http://i.imgur.com/tCatS2c.jpg"
  resizeMode="contain"
/>
```

```html
<GLImage
  source="http://i.imgur.com/tCatS2c.jpg"
  resizeMode="cover"
/>
```

```html
<GLImage
  source="http://i.imgur.com/tCatS2c.jpg"
  resizeMode="cover"
  zoom={0.5}
/>
```

```html
<GLImage
  source="http://i.imgur.com/tCatS2c.jpg"
  resizeMode="cover"
  zoom={0.44}
  center={[ 1, 0.55 ]}
/>
```

### Web usage example

```js
import React from "react";
import {render} from "react-dom";
import {Surface} from "gl-react-dom";
import GLImage from "gl-react-image";

render(
  <Surface width={300} height={300}>
    <GLImage
      source="http://i.imgur.com/tCatS2c.jpg"
    />
  </Surface>
  , document.body
))
```

### React Native usage example

```js
import React from "react";
import {Image, View} from "react-native";
import {Surface} from "gl-react-dom";
import GLImage from "gl-react-image";

export default class Example extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };
  render () {
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage
          source={src}
        />
      </Surface>
    );
  }
}
```
