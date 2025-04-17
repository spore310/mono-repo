import { tryCatch } from "@shared/index"
import { hashPassword, verifyPassword } from "@shared/utils/common/auth/helpers/password"

describe("Password Hashing and Verification", () => {
  it("should hash a password correctly", async () => {
    const password = "password123"
    const { response: hashedPassword, error } = await tryCatch(hashPassword(password, {}))
    expect(error).toBeNull()
    expect(hashedPassword).toContain(":") // Check if the hashed password contains a colon (salt separator)
  })

  it("should throw an error if the password is empty", async () => {
    const { response, error } = await tryCatch(hashPassword("", {}))
    expect(response).toBeNull()
    expect(error).toBeTruthy()
  })

  it("should verify the password correctly", async () => {
    const password = "password123"
    const salt = "4b3c1f2a5e9d7d3f2c8b4a2e3f2e3d2c"

    const { response: hashedPassword } = await tryCatch(hashPassword(password, { salt }))

    const { response: isVerified, error } = await tryCatch(
      verifyPassword({ userPassword: password!, reqPassword: hashedPassword! })
    )
    expect(error).toBeNull()
    expect(isVerified).toBe(true)
  })
})
