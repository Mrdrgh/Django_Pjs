# NotesApp
- This is a Django/React app that uses the REST API as a standart communication between frontend and backend, you can register, login, add Notes (user specific) and delete them, it uses the python REST_framework, AXIOS interceptors, JSON Web Tokens, CORS headers, and the VITE frontend framework
---
## Requirements
- Backend (Django):
  - asgiref
  - Django
  - django-cors-headers
  - djangorestframework
  - djangorestframework-simplejwt
  - PyJWT
  - pytz
  - sqlparse
  - psycopg2-binary
  - python-dotenv
  ---
  - make a backend directory, and install the backend dependecies, it is recommended to have venv (virtual environment) active.
  - you can install them using the `pip install -r requirements.txt` the requirements file is <a href="https://github.com/Mrdrgh/Django_Pjs/blob/main/NotesApp/backend/backend/requirements.txt">here</a>
- Frontend (Vite/React):
  - make a frontend directory, cd into it.
  - run `npm install react-router-dom axios jwt-decode && npm create vite@latest . -- --template react`
---
## How to run
- in the `frontend` folder run: `npm run dev`, and in the `backend` folder run `python manage.py runserver`, you will have to go to the default `localhost:5173` URL that Vite gives.
- you can also access the Admin page in the backend.
  - in the backend folder run : `python manage.py createsuperuser`
  - go to `localhost:8000` or any URL that you specified when you ran the django server, and go to `/admin`

## Athors
- Mohammed Darghal <mrdrgh2003@gmail.com> <mohammed.darghal.23@ump.ac.ma>


