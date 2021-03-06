/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';
import './shop-item.js';

// This element is connected to the redux store.
import { store } from '../store.js';
import { removeFromCart } from '../actions/shop.js';
import { cartItemsSelector, cartTotalSelector } from '../reducers/shop.js';
import { removeFromCartIcon } from './my-icons.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

class ShopCart extends connect(store)(LitElement) {
  _render({_items, _total}) {
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      <p hidden="${_items.length !== 0}">Please add some products to cart.</p>
      ${_items.map((item) =>
        html`
          <div>
            <shop-item name="${item.title}" amount="${item.amount}" price="${item.price}"></shop-item>
            <button
                on-click="${(e) => store.dispatch(removeFromCart(e.currentTarget.dataset['index']))}"
                data-index$="${item.id}"
                title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
        `
      )}
      <p hidden="${!_items.length}"><b>Total:</b> ${_total}</p>
    `;
  }

  static get properties() { return {
    _items: Array,
    _total: Number
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }
}

window.customElements.define('shop-cart', ShopCart);
