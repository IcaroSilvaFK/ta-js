import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import Person from "../src/person.js";

describe("#Person Suite", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  describe("#validate", () => {
    it("should throw an error if the name is not present", () => {
      const person = { cpf: "777.777.777-00", name: "" };

      expect(() => Person.validate(person)).toThrow(
        new Error("name is requried")
      );
    });
    it("should throw an error if the cpf is not present", () => {
      const person = { cpf: "", name: "Rick" };

      expect(() => Person.validate(person)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should not throw when person is valid", () => {
      const person = { cpf: "123.456.789-00", name: "Rick" };

      expect(() => Person.validate(person)).not.toThrow();
    });
  });
  describe("#format", () => {
    // parte do principio que os dados ja foram validados
    it("Should format the person name and CPF", () => {
      //AAA
      // Arrange = Prepara
      const person = {
        name: "Icaro Vieira",
        cpf: "123.456.789-00",
      };

      // Act = Executar
      const result = Person.format(person);

      const expected = {
        name: "Icaro",
        lastName: "Vieira",
        cpf: "12345678900",
      };

      // Assert = Validar
      expect(result).toStrictEqual(expected);
    });
  });
  describe("#save", () => {
    it("should not save a person when required key is missing", () => {
      const mockPerson = {
        name: "Icaro",
        lastName: "Vieira",
      };

      expect(() => Person.save(mockPerson)).toThrow();
    });
  });
  describe("#process", () => {
    it("Shoud process a valid person", () => {
      // Uma outra ideia é não retestar o que ka foi testado
      // testou do caminho A ao caminho B, agora testa o do
      // caminho B ao caminh C
      // Então aqui, eu pulo o caminho A(validate), caminho B (format)
      // e vou direto para o caminho C (save) pois estes caminhos
      // ja foram validados
      // Este métodos abaixo faz mais sentido para quando se tem
      // interações externas como
      // chamadas de API, bancos de dados, etc (que será mostrado na próxima aula)
      // Mocks são simulaCòes de funções que você pode fazer ao testar o comportamento!!!
      // AAA = Arrange, Act, Assert

      //Arrange
      const mockPerson = { name: "Icaro Vieira", cpf: "123.456.789-00" };
      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: "12345678900",
        name: "Icaro",
        lastName: "Vieira",
      });

      const result = Person.process(mockPerson);

      const expected = "ok";

      expect(result).toBe(expected);
    });
  });
});
