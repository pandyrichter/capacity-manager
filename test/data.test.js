import DataCall from "../helpers/data";
 
  test('it returns a defined value', () => {
    expect.assertions(1);
    return DataCall().then(data => {
      expect(data).toBeDefined();
    });
  });
