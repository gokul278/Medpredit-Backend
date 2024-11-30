const DB = require("../../Helper/DBConncetion");
import { UpdateQueryGenerater } from "../../Helper/UpdateQueryGenerater";

export const getUserSQL = async (username: string) => {
  const connection = await DB();
  try {
    const query = "SELECT * FROM user_details";
    const query1 = "SELECT * FROM user_details WHERE username=$1";
    const values = [username];

    if (!username) {
      const result = await connection.query(query);
      return result.rows;
    } else {
      const result = await connection.query(query1, values);
      return result.rows;
    }
  } catch (error) {
    console.error("Error in DB:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const createUserSQL = async (username: string, password: string) => {
  const connection = await DB();
  try {
    const query =
      "INSERT INTO user_details (username, password, created_at) VALUES ($1, $2, NOW())";
    const values = [username, password];

    await connection.query(query, values);
  } catch (error) {
    console.error("Error in DB:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const updateUserSQL = async (
  userid: number,
  username: string,
  password: string
) => {
  const connection = await DB();

  const data = [username, password];

  const stringData = ["username", "password"];

  try {
    const querugenerater = await UpdateQueryGenerater(
      data,
      stringData,
      "user_details",
      userid
    );

    const query = querugenerater.query;
    const values = querugenerater.values;

    await connection.query(query, values);

    return values;
  } catch (error) {
    console.error("Error in DB:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

export const deleteUserSQL = async (userid: any) => {
  const connection = await DB();

  try {
    const query = "DELETE FROM user_details WHERE id=$1";
    const values = [userid];

    await connection.query(query, values);
  } catch (error) {
    console.error("Error in DB:", error);
    throw error;
  } finally {
    await connection.end();
  }
};
