# Alkemy Challenge - Boza Gerónimo

This is an application to keep your monetary income and expenses up to date.

## Installation

Run the following command in the backend and frontend folder.

```bash
npm install
```

## Initialize DB

Depending on your operating system and configuration you may need to change your database credentials inside the `/backend/database/config` folder

Have two options here:

```bash
execute the sql script inside '/backend/database/alkemy.sql'
```

```bash
run
'npx sequelize-cli db:migrate'
'npx sequelize-cli db:seed:all'
```

`In case of using migrations you must first create your database with the name set in your configuration, in this case 'alkemy'`

## Usage steps

```bash
❯ cd backend/
❯ npm start
```

```bash
❯ cd frontend/
❯ npm start
```

You are ready to start using the app!
