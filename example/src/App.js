import React, { Component } from "react";
import { Surface } from "gl-react-dom";
import GLImage from "gl-react-image";
import syncLocationHashQuery from "./syncLocationHashQuery";
import "./App.css";

const makeEditor = (name: string, reduceValue: (oldValue: *) => *) => ({
  value,
  onChange
}) => (
  <span
    className={["editable", name].join(" ")}
    onClick={() => onChange(reduceValue(value))}
  >
    {name}={value instanceof Array ? (
      "[" + value.join(",") + "]"
    ) : (
      String(value)
    )}
  </span>
);

const resizeModes = ["stretch", "contain", "cover", "free"];
const ResizeModeEditor = makeEditor(
  "resizeMode",
  oldValue =>
    resizeModes[(resizeModes.indexOf(oldValue) + 1) % resizeModes.length]
);
const CoverZoomEditor = makeEditor(
  "zoom",
  () => Math.ceil(10 * Math.random() + 10 * Math.random() * Math.random()) / 10
);

const FreeZoomEditor = makeEditor(
  "zoom",
  () => Math.ceil(40 * Math.random()) / 10
);

const CenterEditor = makeEditor("center", () => [
  Math.ceil(4 * Math.random()) / 5,
  Math.ceil(4 * Math.random()) / 5
]);

class Demo extends Component {
  render() {
    const {
      glImageProps,
      onZoomChange,
      onCenterChange,
      onResizeModeChange
    } = this.props;
    const glImage = <GLImage {...glImageProps} />;

    const editors = [
      <ResizeModeEditor
        key="resizeMode"
        value={glImageProps.resizeMode}
        onChange={onResizeModeChange}
      />
    ];
    if (glImageProps.resizeMode === "cover") {
      editors.push(
        <CoverZoomEditor
          key="zoom"
          value={glImageProps.zoom}
          onChange={onZoomChange}
        />
      );
      editors.push(
        <CenterEditor
          key="center"
          value={glImageProps.center}
          onChange={onCenterChange}
        />
      );
    } else if (glImageProps.resizeMode === "free") {
      editors.push(
        <FreeZoomEditor
          key="zoom"
          value={glImageProps.zoom}
          onChange={onZoomChange}
        />
      );
      editors.push(
        <CenterEditor
          key="center"
          value={glImageProps.center}
          onChange={onCenterChange}
        />
      );
    }

    return (
      <div
        className={[
          "demo",
          "resizeMode-" + glImageProps.resizeMode,
          glImageProps.center[0] === 0.5 && glImageProps.center[1] === 0.5
            ? "default-center"
            : "",
          glImageProps.zoom === 1 ? "default-zoom" : ""
        ].join(" ")}
      >
        <h2>
          <span className="image">
            <img src={glImageProps.source} />
            <span
              style={{
                top: (100 * glImageProps.center[1]).toFixed(3) + "%",
                left: (100 * glImageProps.center[0]).toFixed(3) + "%"
              }}
              className="cursor"
            />
          </span>
          <span className="editors">{editors}</span>
        </h2>
        <div className="row">
          <Surface width={400} height={300}>
            {glImage}
          </Surface>
          <Surface width={200} height={300}>
            {glImage}
          </Surface>
          <Surface width={200} height={300}>
            {glImage}
          </Surface>
        </div>
        <div className="row">
          <Surface width={820} height={300}>
            {glImage}
          </Surface>
        </div>
      </div>
    );
  }
}

class App extends Component {
  onZoomChange = (zoom: number) => {
    this.props.setQuery({
      ...this.props.query,
      zoom
    });
  };
  onCenterChange = (center: [number, number]) => {
    this.props.setQuery({
      ...this.props.query,
      center
    });
  };
  onResizeModeChange = (resizeMode: string) => {
    this.props.setQuery({
      ...this.props.query,
      resizeMode
    });
  };
  render() {
    const { query } = this.props;
    return (
      <div className="App">
        <h1>
          <a href="https://github.com/gre/gl-react-image">gl-react-image</a>
        </h1>
        <Demo
          glImageProps={query}
          onResizeModeChange={this.onResizeModeChange}
          onZoomChange={this.onZoomChange}
          onCenterChange={this.onCenterChange}
        />
      </div>
    );
  }
}

export default syncLocationHashQuery(App, {
  resizeMode: "stretch",
  zoom: 1,
  center: [0.5, 0.5],
  source: "http://i.imgur.com/tCatS2c.jpg"
});
