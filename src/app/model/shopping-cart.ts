import { IShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: IShoppingCartItem[] = [];
    constructor(public itemsMap: { [productId: string]: IShoppingCartItem }) {
        for (let productId in itemsMap)
            this.items.push(itemsMap[productId]);
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }
}