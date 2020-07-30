/* eslint-disable no-undef */

describe("view contacts", () => {
  it("checks if Async Storage is used", async () => {
    jest.mock("@react-native-community/async-storage");
    expect(AsyncStorage.getItem).toBeCalledWith("contactDetails");
  });

  it("should tap the view contacts button", async () => {
    await element(by.id("viewContacts")).tap();
  });
});
