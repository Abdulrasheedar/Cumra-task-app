# 📝 Cumra Task App

A full-stack web application with **secure role-based authentication** built using React and Spring Boot.  
It allows:

- 🔐 **Users** to register, log in, and manage their own data submissions
- 🛡️ **Admins** to manage users, update roles, and view all submissions

---

## 💻 Tech Stack

**Frontend**
- React JS
- Bootstrap 5
- Context API
- Axios

**Backend**
- Spring Boot
- Spring Security (JWT-based Auth)
- Hibernate + JPA
- MySQL or H2 (for dev)

---

## 🚀 Setup Instructions

### ✅ Backend (Spring Boot)

1. Clone the project:
   ```bash
   git clone https://github.com/your-username/cumra-task-app.git
   cd backend
2. Configure DB & JWT in application.properties:
   spring.application.name=backend
# ===================== Database Config ====================
spring.datasource.url=jdbc:mysql://localhost:3306/cumrataskapp
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# ===================== Server Port ====================
server.port=8080

# ===================== JWT Secret (Placeholder) ====================
app.jwtSecret = CumraSecureJWTKey_AdminUserDataFlow123456!
app.jwtExpirationsMs = 86400000


# ===================== CORS ====================
spring.web.cors.allowed-origins=http://localhost:5173

3. Run the backend:
   ./mvnw spring-boot:run


