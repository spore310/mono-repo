import { tryCatch } from "@shared/utils/common/tryCatch"
import db from "@shared/utils/common/auth/helpers/db"

/**
 * @param {string} id - The id of the user - should be aquired from the jwt tokeon on the request object
 * @returns {Promise<T>} - Returns a promise that resolves to the user object
 * @throws {Error} - Throws an error if the query fails or for unkown errors; So handle errors for no users found
 * @description - This function is meant to be a wrapper function for a database query to get a user by id
 */
export const getUserById = async <T>(id: string | null): Promise<T> => {
  if (typeof id !== "string" || id.trim() === "") throw new Error("Invalid user ID")
  const { response, error } = await tryCatch(
    db.user.findUnique({
      where: {
        id,
      },
    })
  )
  if (error) {
    throw new Error("Unknown error")
  }
  if (!response?.id) {
    throw new Error("User not found")
  }
  return response as T
}
