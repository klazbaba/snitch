/* eslint-disable no-undef */
describe("setup", () => {
  it("should have welcome screen", async () => {
    await expect(element(by.id("welcomeScreen"))).toBeVisible();
  });

  it("should show setup screen after tap", async () => {
    await element(by.id("getStartedButton")).tap();
    await expect(element(by.id("setupScreen"))).toBeVisible();
  });

  it("should fill up first contact information", async () => {
    await expect(element(by.id("firstContact"))).toBeVisible();
    await element(by.id("contactName")).typeText("Fred");
    await element(by.id("email")).typeText("giwaklaz@gmail.com");
    await element(by.id("username")).typeText("Klaz");
    await element(by.id("fab")).tap();
  });

  it("should fill up second contact information", async () => {
    await expect(element(by.id("secondContact"))).toBeVisible();
    await element(
      by.id("contactName").withAncestor(by.id("secondContact"))
    ).typeText("Seun");
    await element(by.id("email").withAncestor(by.id("secondContact"))).typeText(
      "giwaklaz@gmail.com"
    );
    await element(
      by.id("username").withAncestor(by.id("secondContact"))
    ).typeText("Klaz");
    await element(by.id("fab")).tap();
  });

  it("should fill up third contact information", async () => {
    await expect(element(by.id("thirdContact"))).toBeVisible();
    await element(by.id("scrollView")).scrollTo("bottom");
    await element(
      by.id("contactName").withAncestor(by.id("thirdContact"))
    ).typeText("Clement");
    await element(by.id("email").withAncestor(by.id("thirdContact"))).typeText(
      "giwaklaz@gmail.com"
    );
    await element(
      by.id("username").withAncestor(by.id("thirdContact"))
    ).typeText("Klaz");
    await element(by.id("saveButton")).tap();
    await expect(element(by.id("HomeScreen"))).toBeVisible();
  });
});
