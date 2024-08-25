const userQuery = require("../connection/dbCon");

// Fetch login details
exports.getUserByEmail = async (email) => {
  const query = "SELECT * FROM userDetail WHERE email = $1";
  const values = [email];
  try {
    const result = await userQuery.PoolResult(query, values);
    return result.rows;
  } catch (err) {
    throw new Error("Database query failed");
  }
};

// Create a new user
exports.createUser = async (name, email, password) => {
  const query = `INSERT INTO userDetail (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
  const values = [name, email, password];
  const result = await userQuery.PoolResult(query, values);
  return result.rows;
};

// Create a blog post with user_id
exports.createBlogPost = async (title, content, userId) => {
  const query = `INSERT INTO blogPosts (title, content, userId) VALUES ($1, $2, $3) RETURNING id`;
  const values = [title, content, userId];
  const result = await userQuery.PoolResult(query, values);
  return result.rows;
};

// Update a blog post by ID
exports.updateBlogPost = async (id, title, content) => {
  const query = `UPDATE blogPosts SET title = $1, content = $2 WHERE id = $3 RETURNING *`;
  const values = [title, content, id];
  const result = await userQuery.PoolResult(query, values);
  return result.rows;
};

// Delete a blog post by ID
exports.deleteBlogPost = async (id) => {
  const query = `DELETE FROM blogPosts WHERE id = $1 RETURNING id`;
  const values = [id];
  const result = await userQuery.PoolResult(query, values);
  return result.rows;
};

// Get a specific blog post by ID
exports.getBlogPostById = async (id) => {
  const query = `SELECT * FROM blogPosts WHERE id = $1`;
  const values = [id];
  const result = await userQuery.PoolResult(query, values);
  return result.rows;
};

// Get all blog posts
exports.getAllBlogPosts = async () => {
  const query = `SELECT blogPosts.id, blogPosts.title, blogPosts.content, blogPosts.userId, blogPosts.created_at, blogPosts.updated_at, userDetail.name AS created_by
    FROM blogPosts
    JOIN userDetail ON blogPosts.userid = userDetail.id`;
  try {
    const result = await userQuery.PoolResult(query);
    return result.rows;
  } catch (err) {
    throw new Error("Database query failed");
  }
};

// Get all blog posts with user details
exports.getAllBlogPostsForUser = async (userId) => {
  const query = `
    SELECT blogPosts.id, blogPosts.title, blogPosts.content, blogPosts.userId, blogPosts.created_at, blogPosts.updated_at, userDetail.name AS created_by
    FROM blogPosts
    JOIN userDetail ON blogPosts.userid = userDetail.id
    WHERE blogPosts.userid = $1
  `;
  try {
    const result = await userQuery.PoolResult(query, [userId]);
    return result.rows;
  } catch (err) {
    throw new Error("Database query failed");
  }
};

exports.createBlogPostComment = async (comment, userId, blogId) => {
  const query = `INSERT INTO comments (comment, userId, blogId) VALUES ($1, $2, $3) RETURNING id`;
  const result = await userQuery.PoolResult(query, [comment, userId, blogId]);
  return result.rows;
};

// Get all Comment with user details
exports.getAllBlogPostsForUserForComment = async (blogId) => {
  const query = `
    SELECT 
      b.title,
      b.content,
      array_agg(
        jsonb_build_object(
          'comment', c.comment,
          'name', u.name,
          'created_at', c.created_at,
          'userId', c.userid 
        )
      ) AS comments
    FROM blogPosts AS b
    LEFT JOIN comments AS c ON c.blogid = b.id
    LEFT JOIN userdetail AS u ON c.userid = u.id
    WHERE b.id = $1
    GROUP BY b.title, b.content
  `;

  try {
    const result = await userQuery.PoolResult(query, [blogId]);
    return result.rows;
  } catch (err) {
    console.error("Database query failed:", err);
    throw new Error("Database query failed");
  }
};
