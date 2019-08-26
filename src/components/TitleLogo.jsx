import React from 'react'
import { Component } from 'react'

export default class RedHighlightButton extends Component {
  render() {
    return (
      <div className="container">
        <div className="title">Patchouli</div>
        <div className="summary">next Generation Blog Manager</div>

        <style jsx>{`
          .container {
            text-align: center;
          }

          .title {
            font-size: 96px;
            font-family: Botera TFE;

            -webkit-text-stroke: 0.5px #CCC;
            color: #EEE;
            text-shadow: 0px -1px 0.5px #AAA;
          }

          .summary {
            font-size: 20px;
            color: slategray;
            font-family: fantasy;
          }
        `}</style>
      </div>
    )
  }
}
