# nuxt-contact-frontend

Vue / Nuxt 3 frontend for the Java Spring Boot Contact API.

## Stack
- **Framework:** Nuxt 3 + Vue 3
- **Styling:** Tailwind CSS
- **API:** Java Spring Boot on `http://localhost:5005`

## Pages

| Route               | Description          |
|---------------------|----------------------|
| `/`                 | Home + system status |
| `/contacts`         | All contacts list    |
| `/contacts/create`  | Create new contact   |
| `/contacts/:id`     | Contact detail       |

## Run locally

```bash
npm install
npm run dev
```

App runs on http://localhost:3000

## Environment

```env
NUXT_PUBLIC_API_BASE=http://localhost:5005
```
