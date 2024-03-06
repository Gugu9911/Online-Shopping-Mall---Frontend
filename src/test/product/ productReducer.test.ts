// productReducer.test.ts
import { createNewStore } from "../../redux/store";
import { productServer } from "../server/productServer"; // Adjust the import path as necessary
import {
  fetchAllProducts,
  addProduct,
  fetchProductById,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice";
import { mockProductsItem } from "../../test/mockdata/product"; // Adjust the import path as necessary

// Start the mock server before all tests
beforeAll(() => productServer.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => productServer.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => productServer.close());

describe("product reducer", () => {
  let store = createNewStore();

  beforeEach(() => {
    store = createNewStore();
  });

  test("should fetch all products from api", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().products.products).toEqual(mockProductsItem);
  });

  test("should create a new product", async () => {
    const newProduct = {
      title: "Eco-Friendly Water Bottle",
      price: 30,
      description: "Stay hydrated and eco-friendly...",
      categoryId: 1,
      images: ["https://i.imgur.com/waterBottle.jpg"],
    };
    await store.dispatch(addProduct(newProduct));
    const products = store.getState().products.products;
    expect(products).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Eco-Friendly Water Bottle" })]));
  });

  test("should fetch a single product by id", async () => {
    const productId = mockProductsItem[0].id; // Use the first product's id
    await store.dispatch(fetchProductById(productId));
    expect(store.getState().products.singleProduct).toEqual(mockProductsItem[0]);
  });

  test("should update a product", async () => {
    const updatedProduct = {
      id: mockProductsItem[0].id,
      updatedData: {
        title: "Updated Smart Home Speaker",
      },
    };
    await store.dispatch(updateProduct(updatedProduct));
    const product = store.getState().products.products.find(p => p.id === updatedProduct.id);
    expect(product?.title).toEqual("Updated Smart Home Speaker");
  });

  test("should delete a product", async () => {
    const productId = mockProductsItem[0].id;
    await store.dispatch(deleteProduct(productId));
    expect(store.getState().products.products.find(p => p.id === productId)).toBeUndefined();
  });
});
