import movieProject from "../../assets/images/projects/project-movie.png";
import blogProject from "../../assets/images/projects/project-blog.png";
import chilloutProject from "../../assets/images/projects/project-chillout.png";

export const projects = [
  {
    id: 1,
    name: "Chillout",
    description: `
      <strong class="text-lg font-semibold">Chillout</strong> is a social platform designed for sharing and exploring photos, similar to Instagram. Built for scalability and user engagement.
      <h3 class="text-xl font-bold mt-4">Features:</h3>
      <ul class="list-disc pl-5 mt-2">
        <li>User authentication with Recaptcha protection for secure signups.</li>
        <li>Share photos and explore content through advanced filtering.</li>
        <li>Like, comment, and follow other users.</li>
        <li>Microservice architecture for scalability.</li>
        <li>RabbitMQ for reliable messaging and communication between services.</li>
        <li>Docker for containerized deployments, ensuring consistent environments.</li>
        <li>CI/CD pipelines managed with GitHub Actions for automated testing and deployment.</li>
        <li>Prisma as the ORM and PostgreSQL for efficient data handling and storage.</li>
      </ul>
    `,
    image: chilloutProject,
    codeUrl: "https://github.com/Naveedahmedtech/chill_out_client.git",
    demoUrl: "https://chillout-naveed.netlify.app/",
  },
  {
    id: 2,
    name: "Movie Project",
    description: `
      <strong class="text-lg font-semibold">Movie Project</strong> is your ultimate cinema guide for discovering and exploring movies and TV shows. The platform features a sleek and user-friendly interface.
      <h3 class="text-xl font-bold mt-4">Features:</h3>
      <ul class="list-disc pl-5 mt-2">
        <li>Built with React, Node.js, Express.js, and PostgreSQL for a robust and reliable backend.</li>
        <li>Discover movies and TV shows with advanced search and filtering options.</li>
        <li>View detailed movie information including cast, trailers, and ratings.</li>
        <li>Integration with popular movie APIs to provide real-time data.</li>
      </ul>
    `,
    image: movieProject,
    demoUrl: "https://watchmovienow.netlify.app/",
    codeUrl: "https://github.com/Naveedahmedtech/movie-app",
  },
  {
    id: 3,
    name: "Blog Project",
    description: `
      <h1 class="text-lg font-semibold">Blog Project</h1> is a comprehensive platform for readers and writers to explore blogs and share insights. Designed to cater to avid readers and writers alike.
      <h3 class="text-xl font-bold mt-4">Features:</h3>
      <ul class="list-disc pl-5 mt-2">
        <li>Built using React, Node.js, Nest.js, and MongoDB for seamless data management.</li>
        <li>Advanced blog search and filtering capabilities for easier navigation.</li>
        <li>Detailed author information for better connection between authors and readers.</li>
      </ul>
    `,
    image: blogProject,
    demoUrl: "https://naveed-blogs.netlify.app/",
    codeUrl: "https://github.com/Naveedahmedtech/blog-1-server.git",
  },
];
