import React, {
  Component,
  PropTypes,
} from "react";
import {render} from "react-dom";
import {Surface} from "gl-react-dom";
import GLStaticContainer from "gl-react-dom-static-container";
const {Image: GLImage} = require("../src/index");

const load = src => new Promise((success, failure) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => success(img);
  img.onerror = img.onabort = failure;
  img.src = src;
});

class Demo extends Component {
  render () {
    const { children, title } = this.props;
    const titleStyle = {
      fontFamily: "monospace",
      fontSize: "1.6em",
      fontWeight: "normal",
      whiteSpace: "pre",
    };
    const rootStyle = {
      margin: "auto",
      marginBottom: "10px",
      display: "flex",
      flexDirection: "column",
      width: "820px",
    };
    const rowStyle = {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      marginBottom: "10px",
    };
    return <div style={rootStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <div style={rowStyle}>
        <GLStaticContainer>
          <Surface width={400} height={300} backgroundColor="transparent">
            {children}
          </Surface>
        </GLStaticContainer>
        <GLStaticContainer>
          <Surface width={200} height={300} backgroundColor="transparent">
            {children}
          </Surface>
        </GLStaticContainer>
        <GLStaticContainer>
          <Surface width={200} height={300} backgroundColor="transparent">
            {children}
          </Surface>
        </GLStaticContainer>
      </div>
      <div style={rowStyle}>
        <GLStaticContainer>
          <Surface width={820} height={300} backgroundColor="transparent">
            {children}
          </Surface>
        </GLStaticContainer>
      </div>
    </div>;
  }
}

class Example extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };
  state = {
    image: null,
  };
  load (src) {
    load(src).then(img => this.setState({
      image: { width: img.width, height: img.height, uri: src }
    }));
  }
  componentWillMount () {
    this.load(this.props.src);
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.src !== nextProps.src) this.load(nextProps.src);
  }
  render () {
    const { image } = this.state;
    if (!image) return <div>Loading...</div>;
    const titleStyle = {
      display: "block",
      textAlign: "center",
      fontFamily: "Helvetica",
      fontWeight: "normal",
      letterSpacing: "0.14em",
      fontSize: "2em",
      color: "#000",
      textDecoration: "none",
      padding: "1em 0",
    };
    return (
      <div>
        <a href="https://github.com/gre/gl-react-image" style={titleStyle}>
          gl-react-image
        </a>

        <Demo title="resizeMode=stretch">
          <GLImage
            source={image}
            resizeMode="stretch"
          />
        </Demo>

        <Demo title="resizeMode=contain">
          <GLImage
            source={image}
            resizeMode="contain"
          />
        </Demo>

        <Demo title="resizeMode=cover">
          <GLImage
            source={image}
            resizeMode="cover"
          />
        </Demo>

        <Demo title="resizeMode=cover   zoom=0.5">
          <GLImage
            source={image}
            resizeMode="cover"
            zoom={0.5}
          />
        </Demo>

        <Demo title="resizeMode=cover   zoom=0.5   center=[0.9, 0.5]">
          <GLImage
            source={image}
            resizeMode="cover"
            center={[ 1, 0.55 ]}
            zoom={0.44}
          />
        </Demo>

      </div>
    );
  }
}

const div = document.createElement("div");
document.body.appendChild(div);
render(
  <Example
    src="http://i.imgur.com/tCatS2c.jpg"
  />
, div);
