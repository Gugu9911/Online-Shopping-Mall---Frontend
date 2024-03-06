import { createNewStore } from "../../redux/store";
import {
  fetchUserById,
  getAllUsers,
  loginUser,
  logoutUser,
} from "../../redux/slices/userSlice";
import { mockUsersData, mockToken } from "../mockdata/user";
import { userServer } from "../server/userServer";

beforeAll(() => {
  userServer.listen();
});

let store: any;

beforeEach(() => {
  store = createNewStore();
  localStorage.clear(); // Clear localStorage
});

describe("user reducer", () => {
  test("should fetch all users from api", async () => {
    await store.dispatch(getAllUsers());
    expect(store.getState().user.users).toEqual(mockUsersData);
    expect(store.getState().user.error).toBeNull();
    expect(store.getState().user.loading).toBeFalsy();
  });

  test("should fetch single user from api", async () => {
    const userId = 1; // Assuming you want to fetch the user with ID 1
    await store.dispatch(fetchUserById(userId));
    const expectedUser = mockUsersData.find(user => user.id === userId);
    expect(store.getState().user.user).toEqual(expectedUser);
    expect(store.getState().user.error).toBeNull();
    expect(store.getState().user.loading).toBeFalsy();
  });

  test("should login a user and fetch their profile", async () => {
    const credentials = { email: "dani@gmail.com", password: "123456" };
    await store.dispatch(loginUser(credentials));
    expect(store.getState().user.user).toEqual(mockUsersData[0]);
    expect(localStorage.getItem("token")).toEqual(mockToken.access_token);
    expect(store.getState().user.error).toBeNull();
    expect(store.getState().user.loading).toBeFalsy();
  });

  test("should logout a user", async () => {
    // First, simulate a user login
    localStorage.setItem("token", mockToken.access_token);
    store.dispatch(logoutUser());
    expect(localStorage.getItem("token")).toBeNull();
    expect(store.getState().user.user).toBeNull();
  });
});
