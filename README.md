# Create by Nuxt 3 

* server default use IIS7.
* IIS >= 7
* nodejs >= v20.15.1

## Setup

Make sure to install the dependencies:

```bash
# instail package
npm install

# instail npx
npm install -g npx
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
# normal build
npm run build

# use in IIS
npm run server
```

Locally preview production build:

```bash
npm run preview
```

## Database SQLITE

```bash
# if do update the model, uses the push of the initial schema to the database
npx prisma db push

# visual editor for the data in database 
npx prisma studio
```
