import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "Sapatos",
        price: 150,
        quantity: 1,
        id: 1,
      },

      {
        product: "https://via.placeholder.com/150",
        name: "Sapatos",
        price: 150,
        quantity: 2,
        id: 2,
      },

      {
        product: "https://via.placeholder.com/150",
        name: "Sapatos",
        price: 150,
        quantity: 1,
        id: 3,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.onClearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http.post(`${environment.apiUrl}/checkout`, {
      items: this.cart.items
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(async(res:any) => {
      let stripe = await loadStripe(environment.stripePublicKey);
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }
}
