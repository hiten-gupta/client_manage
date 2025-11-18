Fixed package:
- backend/: Node/Express backend for clients (MySQL).
- src/app/service/data.service.ts replaced to use HttpClient + in-memory meetings.
- create_client_manage.sql included.

Run backend:
cd backend
npm install
copy .env.example .env   # edit DB_PASSWORD
npm start

Run frontend:
cd <angular-root>
npm install
npx ng serve --open

