# 🛡️ Sistema de Gerenciamento de Segurança – Indústrias Wayne

Este sistema realiza controle de acesso e gerenciamento de recursos para ambientes corporativos

---

## 🚀 Como utilizar

### 1️⃣ Instalação das dependências

#### 🔧 Backend

```bash
cd project/backend
pip install -r requirements.txt
```

#### 🎨 Frontend

```bash
cd ../frontend
npm install
```

---

### 2️⃣ Inicialização do sistema

#### ▶️ Iniciar o backend

```bash
cd project/backend
python app.py
```

O backend estará disponível em: [http://localhost:5000](http://localhost:5000)

#### ▶️ Iniciar o frontend

Abra outro terminal:

```bash
cd project/frontend
npm start
```

O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

---

### 3️⃣ Criar usuários

Use os comandos abaixo no terminal para registrar usuários via `curl`:

#### 👑 Admin

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Admin Wayne","email":"admin@wayne.com","password":"admin123","role":"admin"}'
```

#### 🧑‍💼 Gerente

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Gerente Wayne","email":"gerente@wayne.com","password":"gerente123","role":"gerente"}'
```

#### 👷 Funcionário

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Funcionario Wayne","email":"funcionario@wayne.com","password":"func123","role":"funcionario"}'
```

---

### 4️⃣ Login no sistema

Acesse o frontend em: [http://localhost:3000](http://localhost:3000)\
Utilize o e-mail e senha cadastrados para autenticar.

---

## ❗ Dicas de solução de problemas

- ✅ Certifique-se de que o **backend** está rodando corretamente.
- ✅ Verifique se o **frontend** foi iniciado com sucesso.
- 🔐 Confirme que as portas **5000** (backend) e **3000** (frontend) estão liberadas no seu firewall.
- 🖥️ Observe o terminal para mensagens de erro e siga as instruções sugeridas.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🎉 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

## 📅 Status do Projeto

Em desenvolvimento ✅

---

> Desenvolvido para fins de aprendizado e demonstração. Todos os dados são fictícios.

