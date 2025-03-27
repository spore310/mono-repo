import { tryCatch } from "@shared/utils/common/tryCatch";
import db from "@shared/utils/common/auth/db";

export const getUserById = async <T>(id: string): Promise<T> => {
  /**
   * @param {string} id - The id of the user - should be aquired from the jwt tokeon on the request object
   * @returns {Promise<T>} - Returns a promise that resolves to the user object
   * @throws {Error} - Throws an error if the query fails or for unkown errors; So handle errors for no users found
   * @description - This function is meant to be a wrapper function for a database query to get a user by id
   */
  const { response, error } = await tryCatch(
    db.user.findUnique({
      where: {
        id,
      },
    })
  );
  if (error) {
    throw new Error("Unknown error");
  }
  if (!response?.id) {
    throw new Error("User not found");
  }
  return response as T;
};
