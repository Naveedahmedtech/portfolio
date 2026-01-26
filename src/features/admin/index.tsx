import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <section
      id="admin"
      className="section-blend px-6 py-20 lg:px-16"
      style={
        {
          "--section-bg": "#120f0d",
          "--section-next-bg": "#0f0d0b",
        } as React.CSSProperties
      }
    >
      <h2 className="font-display text-2xl">Admin Dashboard (scaffold)</h2>
    </section>
  );
};

export default AdminDashboard;
