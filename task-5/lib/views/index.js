/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuccessView = getSuccessView;
exports.getErrorView = getErrorView;

function getSuccessView(data) {
  return {
    data
  };
}

function getErrorView(data) {
  return {
    error: {
      message: data
    }
  };
}