import pool from './pool';

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT 
        external_id, 
        login, 
        password, 
        age, 
        is_deleted 
      FROM public.users
      ORDER BY login
      LIMIT ALL;
    `
  );
  client.release();
  return result.rows;
}

/**
 * Gets user by ID.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function getUserById(id) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT
        external_id,
        login,
        password,
        age,
        is_deleted
      FROM public.users
      WHERE external_id=$1;
    `,
    [id]
  );
  client.release();
  return result.rowCount === 1 ? result.rows[0] : null;
}

/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */
export async function getAutoSuggestUsers(loginSubstring, limit) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT 
        external_id, 
        login, 
        password, 
        age, 
        is_deleted 
      FROM public.users
      WHERE
        is_deleted=false AND login LIKE CONCAT('%', $1::text, '%')
      ORDER BY login
      LIMIT $2;
    `,
    [
      loginSubstring,
      limit
    ]

  );
  client.release();
  return result.rows;
}

/**
 * Creates a new user.
 * @param {string} login
 * @param {string} password
 * @param {number} age
 * @returns {Promise<object>}
 */
export async function createUser({ login, password, age }) {
  const client = await pool.connect();
  const result = await client.query(
    `
      INSERT INTO public.users (login, password, age, is_deleted)
      VALUES ($1, $2, $3, $4)
      RETURNING 
        external_id,
        login, password,
        age,
        is_deleted
      ;
    `,
    [login, password, age, false]
  );
  client.release();
  return result.rows[0];
}

/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */
export async function updateUser({ id, password, age }) {
  const client = await pool.connect();
  const result = await client.query(
    `
      UPDATE public.users
      SET
        password=$2,
        age=$3
      WHERE external_id=$1 
      RETURNING 
        external_id,
        login, password,
        age,
        is_deleted
      ;
    `,
    [id, password, age]
  );
  client.release();
  return result.rows[0];
}

/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserSoft(id) {
  const client = await pool.connect();
  const result = await client.query(
    `
      UPDATE public.users
      SET is_deleted=true
      WHERE external_id=$1;
    `,
    [id]
  );
  client.release();
  return result.rowCount === 1;
}

/**
 * Marks a user as deleted (hard deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserHard(id) {
  const client = pool.connect();
  const result = await client.query(
    `
      DELETE FROM public.users
      WHERE external_id=$1;
    `,
    [id]
  );
  client.release();
  return result.rowCount === 1;
}
