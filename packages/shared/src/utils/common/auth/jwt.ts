import { tryCatch } from "@common/tryCatch" // Utility for handling errors
import { env } from "@shared/config/env"
import { createHash } from "crypto" // Node.js crypto module for hashing
import { EncryptJWT, jwtDecrypt, JWTDecryptResult, JWTPayload } from "jose" // Library for JWT encryption and decryption

/**
 * Interface for the JWT payload.
 * @description - Represents the structure of the payload that will be encrypted into a JWT.
 */
interface JWTPayLoad {
  [key: string]: string | number // Allows any key-value pairs
}

/**
 * Type alias for the token response.
 * @description - Represents the encrypted JWT token as a string.
 */
type TokenResponse = string

// Create a SHA-256 hash of the secret key from the environment variable
const jwtSecret = new Uint8Array(
  createHash("sha256") // Create a SHA-256 hash
    .update(env.AUTH_SECRET_JTW_KEY!) // Update the hash with the secret key (ensure it's defined)
    .digest() // Finalize the hash and convert it to a Uint8Array
)

// Get the JWT encryption algorithm from the environment variable
const algo = env.AUTH_JWT_ALGO! // Ensure the algorithm is defined

/**
 * Encrypts a payload into a JWT token.
 *
 * @param {JWTPayLoad} payload - The payload to encrypt.
 * @returns {Promise<TokenResponse>} - A promise that resolves to the encrypted JWT token.
 * @throws {Error} - Throws an error if encryption fails.
 * @description - This function encrypts a payload into a signed and encrypted JWT token.
 */
export const encryptToken = async (payload: JWTPayLoad): Promise<TokenResponse> => {
  // Create an encrypted JWT with the payload
  const encPayLoad = new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: algo }) // Use 'dir' for direct encryption
    .setIssuedAt() // Set the issued-at timestamp
    .encrypt(jwtSecret) // Encrypt the payload using the secret key

  // Wrap the encryption process in tryCatch to handle errors
  const { error, response: token } = await tryCatch<string>(encPayLoad)

  // Throw an error if encryption fails
  if (error) {
    throw new Error(error)
  }

  // Return the signed and encrypted JWT token
  return token as TokenResponse
}

/**
 * Decrypts a JWT token to retrieve the payload.
 *
 * @param {string} token - The encrypted JWT token to decrypt.
 * @returns {Promise<JWTDecryptResult<JWTPayload>>} - A promise that resolves to the decrypted payload.
 * @throws {Error} - Throws an error if decryption fails.
 * @description - This function decrypts a JWT token and retrieves the original payload.
 */
export const decrpytToken = async (token: string): Promise<JWTDecryptResult<JWTPayload>> => {
  // Decrypt the JWT token using the secret key
  const decPayLoad = jwtDecrypt(token, jwtSecret)

  // Wrap the decryption process in tryCatch to handle errors
  const { error, response } = await tryCatch(decPayLoad)

  // Throw an error if decryption fails
  if (error) {
    throw new Error(error)
  }
  if (!response) {
    throw new Error("Decryption failed")
  }
  // Return the decrypted payload
  return response
}
