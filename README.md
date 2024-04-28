# Sobre testes

### Testes de integração

<p>
Verifica se a integração do banco de dados e servidor se comunicam bem
</p>
--- Exemplo

```js
const request = require("supertest");
const app = require("../app"); // Seu arquivo principal da API

describe("Teste de Integração:  Criação de Tarefa", () => {
  it("Deve criar uma nova tarefa", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Nova tarefa", completed: false });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Nova tarefa");
    expect(response.body.completed).toBe(false);
  });
});
```

### Exemplo no front

```js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Teste de Integração: Componente Button", () => {
  it("Deve chamar a função de callback ao ser clicado", () => {
    const onClickMock = jest.fn();

    const { getByText } = render(<Button onClick={onClickMock}>Clique</Button>);

    const button = getByText("Clique");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
```

### Teste e2e

<p>
  Um exemplo de script para um teste e2e seria
</p>

- [x] Bate na API, verifica que ela retornou status 201
- [x] Bate no endpoint de listagem e verifica que agora possui um item

```js
const request = require("supertest");
const app = require("../app"); // Seu arquivo principal da API

describe("Teste de Integração:  Criação de Tarefa", () => {
  it("Deve criar uma nova tarefa", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send({ title: "Nova tarefa", completed: false });

    expect(createResponse.status).toBe(201);

    const taskId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ completed: true });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.completed).toBe(true);

    const getResponse = await request(app).get(`/tasks/${taskId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.completed).toBe(true);
  });
});
```

---

## Testes de Integração

validam componentes e suas respectivas respostas

## Teste E2E

validam o fluxo do usuário e o que a sua itegração alterou no estado da entidade.

1 - Não toque no código enquanto você não estiver 100% satisfeito que entendeu o problema
e o passo a passo para a solução

2 - Valide o que você entregou e forma automatizada

3 - Prepare o setup de ferramental (testes e debugging) no momento da criação do projeto
