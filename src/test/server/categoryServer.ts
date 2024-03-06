import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { CartMock } from "../../test/mockdata/cart";

export const handler = [
  //Handler for fetching all categories
  http.get("https://api.escuelajs.co/api/v1/categories", () => {
    return HttpResponse.json(CartMock, { status: 200 });
  }),
];

export const categoryServer = setupServer(...handler);