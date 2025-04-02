import { tryCatch } from "@shared/utils/common/tryCatch";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
describe("tryCatch function tests", () => {
  it("catches a promise and returns the value in an object named response with a generic return type", async () => {
    const promise = Promise.resolve("Hello, world!");
    const { response, error } = await tryCatch(promise);
    expect(response).toBe("Hello, world!");
    expect(error).toBeNull();
  });

  it("should also handle cases where an error is thrown in the promise and it rejects with an error object", async () => {
    const promise = Promise.reject(new Error("An error occurred"));
    const { response, error } = await tryCatch(promise);
    expect(response).toBeNull();
    expect(error).toBe("An error occurred");
  });

  it("this should test if something other than an error object is thrown, it should give the unknown error message", async () => {
    const promise = Promise.reject("Random test text");
    const { response, error } = await tryCatch(promise);
    expect(response).toBeNull();
    expect(error).toBe("An unknown error occurred");
  });
});
