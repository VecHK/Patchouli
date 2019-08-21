import React from 'react'

import style from './CheckoutBlock.module.css'

export default class CheckoutBlock extends React.Component {
  render() {
    return (
      <div className="checkout-block">
        <div>check</div>

        <style jsx>{`
          .checkout-block {
            position: absolute;
            top: 0;
            left: calc(-${style.width});

            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;

            height: 100%;
            width: ${style.width};
            background: rgb(232, 232, 232);
            text-shadow: 0px 0.8px 0px #f5f5f5;

            box-shadow:
              inset 0px 2px 2px -2px #AAA,
              inset 0px -2px 1px -2px #AAA,
              inset -2px 0px 2px -2px #AAA;

            border-right: solid 1px rgb(208, 208, 208);
          }
        `}
        </style>
      </div>
    )
  }
}
