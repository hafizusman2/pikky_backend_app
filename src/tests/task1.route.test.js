const request = require("jest");
const app = require("../main"); // Adjust the path to your Express app

describe("Task1 Routes", async () => {
  it("should perform task1 action", async () => {
    const res = await request(app).post("/api/task1/action").send({
      param1: "value1",
      param2: "value2"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("result");
  });
});
