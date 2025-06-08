<div align="center">
  <h1>Rick and Morty List</h1>
  <div>
    <a href="rick-and-morty-list-chi.vercel.app">View</a>
  <span> • </span>
    <a href="https://github.com/sneyderdev/rick-and-morty-list/issues/">Report Bug</a>
  <span> • </span>
    <a href="https://github.com/sneyderdev/rick-and-morty-list/issues/">Request Feature</a>
  </div>
</div>

## 🌟 About

Rick and Morty List is a modern, responsive web application that allows users to browse and bookmark characters from the popular TV show "Rick and Morty" powered by [Rick and Morty API](https://rickandmortyapi.com/).

### 🎯 Features

- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Data**: Fresh data from the Rick and Morty API.
- **Character Browsing**: View all characters from the Rick and Morty API.
- **Bookmarking System**: Save your favorite characters with persistent local storage.
- **Character Details**: Detailed view for each character.
- **Clean Navigation**: SEO-friendly URLs (`/character/:id`).
- **Static Generation**: Pre-generated pages for optimal performance.

### 👾 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Integration**: [Rick and Morty API](https://rickandmortyapi.com/)
- **Data Validation**: [Zod](https://zod.dev/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

## 📦 Getting Started

To get started with the Rick and Morty List application, follow these steps:

### 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sneyderdev/rick-and-morty-list.git
   cd rick-and-morty-list
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

   > **Note**: This project uses `pnpm` as the package manager. While `npm` and `yarn` may work, `pnpm` is recommended for consistency with the lock file.

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### 🚀 Build & Deploy

1. **Create a production build**

   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

### 🧪 Testing

Run the test suite:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

---

Made with 💜 by [@sneyderdev](https://github.com/sneyderdev)
