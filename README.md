# gl-react-image ![](https://img.shields.io/npm/v/gl-react-image.svg) ![](https://img.shields.io/badge/gl--react-~2.2-05F561.svg) ![](https://img.shields.io/badge/gl--react-dom%20%7C%20native-f90.svg)

[Universal](https://projectseptemberinc.gitbooks.io/gl-react/content/docs/universal.html) gl-react **Image that implements [resizeMode prop](https://facebook.github.io/react-native/docs/image.html#resizemode)** in OpenGL.

## `{Image}` Props

- `source` **(required)**: the image URL. You can also provide a `{ width, height, uri }` or a string URL.
- `imageSize` **(required, if use source:String format)**: a `{ width, height }` object that is the image dimension. It's your responsibility to load the image and get its dimension before rendering with `gl-react-image`. In React Native, you can use [`Image.getSize`](https://facebook.github.io/react-native/docs/image.html#getsize).
- `resizeMode`: cover | stretch | contain : This implement the exact same [React Native Image resizeMode prop](https://facebook.github.io/react-native/docs/image.html#resizemode) in OpenGL.
- `center` and `zoom` props can be used with `resizeMode=cover` to define the cover crop position:
  - `center`, an [x,y] array, defines the gravity of the crop *(x and y are in [0, 1] bound)*.
  - `zoom` should be a value in **] 0 , 1 ]** bound. 1 means no zoom, more value is close to 0, more the zoom is important.

## Example

[**Open examples**](https://gre.github.io/gl-react-image)


```html
<GLImage
  source="http://i.imgur.com/tCatS2c.jpg"
  imageSize={{ width: 1024, height: 693 }}
  resizeMode="stretch"
/>
```

alternative syntax is to use only `source` via a `{ uri, width, height }` object.

```html
<GLImage
  source={{ uri: "http://i.imgur.com/tCatS2c.jpg", width: 1024, height: 693 }}
  resizeMode="stretch"
/>
```

```html
<GLImage
  source={{ uri: "http://i.imgur.com/tCatS2c.jpg", width: 1024, height: 693 }}
  resizeMode="contain"
/>
```

```html
<GLImage
  source={{ uri: "http://i.imgur.com/tCatS2c.jpg", width: 1024, height: 693 }}
  resizeMode="cover"
/>
```

```html
<GLImage
  source={{ uri: "http://i.imgur.com/tCatS2c.jpg", width: 1024, height: 693 }}
  resizeMode="cover"
  zoom={0.5}
/>
```

```html
<GLImage
  source={{ uri: "http://i.imgur.com/tCatS2c.jpg", width: 1024, height: 693 }}
  resizeMode="cover"
  zoom={0.44}
  center={[ 1, 0.55 ]}
/>
```

> If you don't know the image dimension by advance, you can still load the image on your side and extract it out:

### Web usage example

```js
import React from "react";
import {render} from "react-dom";
import {Surface} from "gl-react-dom";
const {Image: GLImage} = require("gl-react-image");

const load = src => new Promise((success, failure) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => success(img);
  img.onerror = img.onabort = failure;
  img.src = src;
});

load("http://i.imgur.com/tCatS2c.jpg")
.then(img =>
  render(
    <Surface width={300} height={300}>
      <GLImage
        source={img.src}
        imageSize={{ width: img.width, height: img.height }}
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
const {Image: GLImage} = require("gl-react-image");

export default class Example extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };
  state = {
    imageSize: null,
  };
  componentWillMount () {
    Image.getSize(this.props.src, (width, height) =>
      this.setState({
        imageSize: { width, height }
      }));
  }
  render () {
    const {imageSize} = this.state;
    if (!imageSize) return <View />;
    return (
      <Surface width={300} height={300}>
        <GLImage
          source={src}
          imageSize={imageSize}
        />
      </Surface>
    );
  }
}
```
