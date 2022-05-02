it("GET /user should return access denied", async () => {
    const server = await startServer;
    const response = await request(server).get(PREFIX + "/user");
    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual({ message: "Access denied" });
  });