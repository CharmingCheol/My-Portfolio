import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      responseImage: "https://res.cloudinary.com/demo/image/upload/w_400/sofa_cat.jpg",
      serverUrl: "http://localhost:3001/api",
    },
    supportFile: false,
  },
});
