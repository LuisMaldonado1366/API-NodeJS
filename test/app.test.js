describe("[APP] This is a general test", () => {
  // Applies only to tests in this describe block

  test("This should return 8", () => {
    const a = 4;
    const b = 4;
    const total = a + b;

    expect(total).toEqual(8);
  });
});
