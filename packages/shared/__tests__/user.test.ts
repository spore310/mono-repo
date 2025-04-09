import { getUserById } from "@shared/utils/common/auth/helpers/user"
jest.mock("@shared/utils/common/auth/helpers/db", () => ({
  __esModule: true,
  default: require("../__mocks__/dbAuth").default,
}))
import db from "@shared/utils/common/auth/helpers/db"
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {})
  jest.clearAllMocks()
})
describe("getUserByID function tests ", () => {
  it("should return the user object when a valid user ID is provided", async () => {
    const response = {
      id: "1",
      username: "test0",
      password: "test",
      email: "test@test.com",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    }
    ;(db.user.findUnique as jest.Mock).mockResolvedValue(response)
    await expect(getUserById("1")).resolves.toEqual(response)
  })

  it("should throw a 'User not found' error when no user is returned from the database", async () => {
    ;(db.user.findUnique as jest.Mock).mockResolvedValue(null)
    await expect(getUserById("1")).rejects.toThrow("User not found")
  })

  it("should throw an 'Unknown error' when the database query fails", async () => {
    ;(db.user.findUnique as jest.Mock).mockRejectedValue(new Error("Unknown error"))
    await expect(getUserById("1")).rejects.toThrow("Unknown error")
  })
})
