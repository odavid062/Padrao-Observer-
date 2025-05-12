#  Sistema Observer de Preços

Este projeto é uma aplicação completa demonstrando o padrão de projeto **Observer** em uma arquitetura desacoplada:

- Backend em **Spring Boot (API REST)**
- Frontend em **React + Vite**
- Documentação da API com **Swagger**

---

##  Tecnologias Utilizadas

| Camada      | Tecnologias               |
|-------------|---------------------------|
| Backend      | Spring Boot, Observer Pattern, Swagger (Springdoc OpenAPI) |
| Frontend     | React, Vite, Axios        |

---

##  Funcionalidades

- Cadastro de produtos
- Atualização de preço de produtos
- Registro de observadores via URL
- Notificação simulada aos observadores ao atualizar preços
- Integração frontend <-> backend via Axios
- API documentada e testável via Swagger

---

##  Como rodar o projeto

### Backend (Spring Boot)

1. Navegue até a pasta `backend`
2. Rode:
   ```bash
   ./mvnw spring-boot:run
   ```
3. Acesse:
   - API: [http://localhost:8080/api/products](http://localhost:8080/api/products)
   - Swagger: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### Frontend (React + Vite)

1. Navegue até a pasta `frontend`
2. Rode:
   ```bash
   npm install
   npm run dev
   ```
3. Acesse:
   - Frontend: [http://localhost:5173](http://localhost:5173)

---

##  Observações

- O **backend e frontend são projetos separados**, cada um rodando na sua própria porta.
- O **frontend consome as APIs do backend via Axios**, apontando para `http://localhost:8080`.
- A API está documentada e testável via **Swagger UI**.

---

##  Autor

David Rodrigues   
Aprendendo na prática como integrar, desacoplar e entregar soluções reais com arquitetura limpa.
