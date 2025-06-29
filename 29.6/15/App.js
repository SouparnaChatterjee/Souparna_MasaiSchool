import React, { useState } from "react";

const blogs = [
  { title: "Mastering JavaScript", content: "JavaScript is a powerful language for web development." },
  { title: "React in Indian Startups", content: "React is widely used in many Indian tech companies." },
  { title: "Career in Web Development", content: "Explore job roles and growth in web development." }
];

function BlogViewer() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Blog Titles</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {blogs.map((blog, index) => (
          <li
            key={index}
            onClick={() => setSelectedBlog(blog)}
            style={{
              cursor: "pointer",
              color: "#007bff",
              marginBottom: "10px",
              textDecoration: "underline"
            }}
          >
            {blog.title}
          </li>
        ))}
      </ul>

      <hr />

      <div>
        {selectedBlog ? (
          <>
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.content}</p>
          </>
        ) : (
          <p style={{ color: "gray" }}>Select a blog to read</p>
        )}
      </div>
    </div>
  );
}

export default BlogViewer;
