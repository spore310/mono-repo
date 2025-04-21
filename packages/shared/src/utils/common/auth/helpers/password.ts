import crypto from "crypto"
import { tryCatch } from "@shared/utils/common/tryCatch"

/**
 *
 * @param pass - The password to split
 * @returns `string[]` an array of strings containing the hashed password and the salt
 * @throws `Error` - Throws an error if the password format is invalid
 */
const getPassSplit = (pass: string): string[] => {
  if (!pass?.includes(":") || pass?.split(":").length !== 2) {
    throw new Error("Invalid password format")
  }
  return pass.split(":")
}
export interface loginPayload {
  userPassword: string
  reqPassword: string
}

/**
 * @param {string} body.userPassword - The user's password from the database
 * @param {string} body.reqPassword - The password from the request body
 * @returns {Promise<boolean>} `isMatch` - Returns true if the passwords match, false otherwise
 * @description  This function compares the user's password from the database with the password from the request body
 */
export const verifyPassword = async (body: loginPayload): Promise<boolean> => {
  const { userPassword, reqPassword } = body
  if (userPassword.length === 0 || reqPassword.length === 0) {
    throw new Error("Password cannot be empty")
  }
  const [reqPass, salt] = getPassSplit(reqPassword)
  if (!reqPass || !salt) {
    throw new Error("Invalid password format")
  }
  const newPass = await hashPassword(userPassword, { salt: salt })
  const [userPass, _] = getPassSplit(newPass)
  return userPass === reqPass
}

/**
 * @param {string} pass - The password to hash
 * @param {object} options - The options object
 * @param {number} options.keylen - The key length
 * @param {number} options.iterations - The number of iterations
 * @param {string} options.digest - The digest algorithm
 * @param {number} options.saltLength - The salt length
 * @param {string} options.salt - Provides salt for encryption; Overrides options.saltLength
 * @returns {Promise<string>} - Returns a promise that resolves to the hashed password
 * @description - This function hashes the password using the PBKDF2 algorithm
 */
export const hashPassword = async (
  pass: string,
  options: {
    keylen?: number
    iterations?: number
    digest?: string
    saltLength?: number
    salt?: string
  }
): Promise<string> => {
  if (pass.length === 0) {
    throw new Error("Password cannot be empty")
  }
  const {
    keylen = 64,
    iterations = 100000,
    digest = "sha512",
    saltLength = 32,
    salt: newSalt = undefined,
  } = options

  const salt = newSalt ?? crypto.randomBytes(saltLength).toString("hex")
  const newpromise = new Promise((resolve, reject) => {
    crypto.pbkdf2(
      pass,
      salt,
      iterations,
      keylen,
      digest,
      (err: Error | null, derivedKey: Buffer<ArrayBufferLike>) => {
        if (err) return reject(err)
        // Return the salt and the hashed password (you can store both for later verification)
        resolve(`${derivedKey.toString("hex")}:${salt}`)
      }
    )
  })
  const { error, response: newPass } = await tryCatch(newpromise)
  if (error) {
    throw new Error(error)
  }
  return newPass as string
}
