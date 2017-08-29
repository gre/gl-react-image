import React, { Component } from "react";
import querystring from "querystring";

function equals(a, b) {
  if (a === b) return true;
  if (typeof a === "object" && typeof b === "object" && a && b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(k => equals(a[k], b[k]));
  }
  return a === b;
}

export default (App, defaultState) =>
  class extends Component {
    state = this.stateFromURL();

    stateFromURL() {
      let { hash } = window.location;
      if (!hash) return defaultState;
      if (hash) hash = hash.slice(1);
      const parsed = querystring.parse(hash);
      const state = { ...defaultState };
      Object.keys(state).forEach(k => {
        if (k in parsed) {
          try {
            state[k] =
              typeof parsed[k] === "string" ? JSON.parse(parsed[k]) : parsed[k];
          } catch (e) {
            console.log(e);
          }
        }
      });
      return state;
    }

    saveStateToURL(state) {
      state = { ...state };
      Object.keys(state).forEach(k => {
        if (equals(state[k], defaultState[k])) {
          delete state[k];
        } else {
          state[k] = JSON.stringify(state[k]);
        }
      });
      window.location.hash = querystring.stringify(state);
    }

    setQuery = query => {
      this.saveStateToURL(query);
      this.setState(query);
    };

    render() {
      return <App query={this.state} setQuery={this.setQuery} />;
    }
  };
