VIRTUAL BOOK STORE APP
===================================================

DESCRIPTION
-----------
This is a full-stack web application that allows users to view the inventory of digital books.
Only the admin user can add, edit, or delete books. Normal users can register and view the inventory.

Frontend:  HTML, CSS, JavaScript  
Backend:   Node.js + Express  
Database:  PostgreSQL  
Containerization: Docker

FEATURES
--------
- User login and registration
- Role-based access control (admin vs. normal user)
- View books (open to all users)
- Add, update, delete books (admin only)
- Admin redirected to full CRUD interface
- Normal users redirected to view-only page
- Preset admin account included in setup
- Error Handling 

DEFAULT ADMIN LOGIN
-------------------
Username: admin  
Password: admin123

FILE STRUCTURE
--------------
/frontend
  - index.html     
  - admin.html     
  - user.html       
  - script.js      
  - styles.css   
  - Dockerfile   

/backend
  - node_modules
  - server.js       
  - db.js           
  - Dockerfile      
  - package.json    
  - package-lock.json

docker-compose.yml 
db-init/init.sql    

SETUP INSTRUCTIONS
------------------
1. Install Docker and Docker Compose

2. Clone the repo:
   git clone https://github.com/GalacticCypher/CRUD-Weekley.git

3. Navigate to the project folder:
   cd CRUD-Weekley

4. Build and run the containers:
   docker-compose up --build

5. Open your browser:
   - Go to http://localhost:3000 to access the login page

DATABASE SETUP
--------------
The database will automatically:
- Create the "books" and "users" tables
- Seed sample books
- Seed a preset admin user (admin/admin123)

TROUBLESHOOTING
---------------
If you change the init.sql or want to reset the database:

   docker-compose down -v
   docker-compose up --build

This will reset volumes and re-seed the database.



