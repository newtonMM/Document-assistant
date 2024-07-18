import chai from "chai";
import chaiHttp from "chai-http";
const { expect } = chai;

import app from "../index";

chai.use(chaiHttp);

// Mock authentication to bypass auth middleware
const authToken = process.env.MOCK_AUTH_TOKEN;

let userId = `6572ab7790e94e6475d0f8c4`;
let firebaseUID = `WM2uroI8KZaNqjjvL08BqjriP0C`;

// Tests
describe("User Routes", () => {
  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const res = await chai
        .request(app)
        .post("/api/users")
        .set("Authorization", `Bearer ${authToken}`)
        .send({});

      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
    });
  });

  describe("GET /api/users/:id", () => {
    it("should get a user by ID", async () => {
      const existingUserId = userId;
      const res = await chai
        .request(app)
        .get(`/api/users/${existingUserId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
    });

    it("should handle user not found", async () => {
      const nonExistingUserId = "blah";
      const res = await chai
        .request(app)
        .get(`/api/users/${nonExistingUserId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res).to.have.status(404);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user", async () => {
      const existingUserId = userId;
      const res = await chai
        .request(app)
        .delete(`/api/users/${existingUserId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal({ message: "User deleted." });
    });

    it("should handle user not found", async () => {
      const nonExistingUserId = "blah";
      const res = await chai
        .request(app)
        .delete(`/api/users/${nonExistingUserId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res).to.have.status(404);
    });
  });
});
