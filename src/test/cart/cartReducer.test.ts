// cartReducer.test.ts
import { createNewStore } from "../../redux/store";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } from "../../redux/slices/cartSlice";
import { mockCartItem, testUserId } from "../mockdata/cart"; // Assuming the mock data file is named cart.ts

let store = createNewStore();

beforeEach(() => {
  // Clear the cart for the test user before each test
  store.dispatch(emptyCart({ userId: testUserId }));
});

describe("cartSlice reducer", () => {
  // Test for adding an item to the cart
  test("should add cart item to cart for a user", () => {
    store.dispatch(addToCart({ userId: testUserId, item: mockCartItem }));
    expect(store.getState().cart.itemsByUserId[testUserId]).toEqual([mockCartItem]);
  });

  // Test for removing an item from the cart
  test("should remove cart item from cart for a user", () => {
    store.dispatch(addToCart({ userId: testUserId, item: mockCartItem }));
    store.dispatch(removeFromCart({ userId: testUserId, itemId: mockCartItem.id }));
    expect(store.getState().cart.itemsByUserId[testUserId]).toEqual([]);
  });

  // Test for increasing quantity of a cart item
  test("should increase quantity of cart item for a user", () => {
    store.dispatch(addToCart({ userId: testUserId, item: mockCartItem }));
    store.dispatch(increaseQuantity({ userId: testUserId, itemId: mockCartItem.id }));
    const updatedItem = { ...mockCartItem, quantity: mockCartItem.quantity + 1 };
    expect(store.getState().cart.itemsByUserId[testUserId]).toEqual([updatedItem]);
  });

  // Test for decreasing quantity of a cart item
  test("should decrease quantity of cart item for a user", () => {
    // Adjust mockCartItem quantity to 2 initially for this test to make sense
    const itemWithIncreasedQuantity = { ...mockCartItem, quantity: 2 };
    store.dispatch(addToCart({ userId: testUserId, item: itemWithIncreasedQuantity }));
    store.dispatch(decreaseQuantity({ userId: testUserId, itemId: mockCartItem.id }));
    expect(store.getState().cart.itemsByUserId[testUserId]).toEqual([mockCartItem]); // Expect quantity to be back to 1
  });

  // Test for emptying the cart
  test("should empty the cart for a user", () => {
    store.dispatch(addToCart({ userId: testUserId, item: mockCartItem }));
    store.dispatch(emptyCart({ userId: testUserId }));
    expect(store.getState().cart.itemsByUserId[testUserId]).toEqual([]);
  });
});
