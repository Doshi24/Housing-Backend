# Housing-Backend

# 🚀 Project Contribution & Workflow Guidelines  

## 📥 Pulling & Dependencies  
1. **Always run `npm install` after pulling the repo**  
   - Node modules are not included in Git, so this ensures you stay up to date with dependencies.  

2. **Environment Setup (`.env`)**  
   - We provide an `env.copy` file in the repo with all required keys and values.  
   - After pulling:  
     - Copy content from `env.copy` → paste into a new file → rename as `.env`.  
     - There will be **two `.env` files** maintained:  
       - One for **local development**.  
       - One for **remote/deployment**.  

---

## 🌱 Branch Strategy  
We follow a **4-branch workflow** to keep the codebase clean and stable:  

1. **`main`** → Production-ready, stable code.  
2. **`develop`** → Integration branch, collects tested features before merging to `main`.  
3. **`vinit.develop`** → Personal development branch for Vinit.  
4. **`monil.develop`** → Personal development branch for Monil.  

🔄 **Workflow:**  
- Develop features in personal branches (`vinit.develop` or `monil.develop`).  
- After testing locally, merge into `develop`.  
- Only after stable QA/testing, merge `develop` → `main`.  
- ❌ Do **not** directly commit to `develop` or `main`.  

---

## 📂 Folder Structure & Code Organization  
We follow an MVC-inspired structure to keep code modular, scalable, and maintainable:  


---

## 🛠 Code Maintenance Rules  
- **Routes**: Only define endpoint paths here, no logic.  
- **Controllers**: Contain business logic, call models/services.  
- **Models**: Define DB schemas (Mongoose/Sequelize/etc.) and queries.  
- **Middleware**: Reusable request/response handlers (auth, validation, error-handling).  
- **Services**: Place for reusable logic (e.g., sending emails, calling APIs).  
- **Utils**: Keep utility/helper functions here to avoid duplication.  

---

## ✅ Best Practices  
- Always pull the latest branch before starting new work.  
- Write meaningful commit messages (`feat:`, `fix:`, `chore:`).  
- Keep code modular and avoid writing everything in a single file.  
- Use `.env` for secrets and configs (never hardcode).  
- Test locally before raising PRs.  
- Document any new API route in the project wiki/README.  
