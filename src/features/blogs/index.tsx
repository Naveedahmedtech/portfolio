import React from "react";

const Blogs: React.FC = () => {
  return (
    <section
      id="blogs"
      className="section-blend px-6 py-20 lg:px-16"
      style={
        {
          "--section-bg": "#14110f",
          "--section-next-bg": "#1a1512",
        } as React.CSSProperties
      }
    >
      <h2 className="font-display text-2xl">Blogs (scaffold)</h2>
    </section>
  );
};

export default Blogs;
