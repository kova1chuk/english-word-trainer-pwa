# 📘 English Word Trainer

**English Word Trainer** is a Progressive Web App (PWA) designed to help Ukrainian-speaking users build and retain English vocabulary effectively. Through interactive exercises, spaced repetition, and clean UI, it delivers a powerful learning experience on any device.

---

## 🚀 Features

* ✅ Interactive exercises for efficient word practice
* ✅ Spaced repetition system for optimal memorization
* ✅ Offline access via PWA support
* ✅ Custom word lists and dictionary integration
* ✅ Real-time progress tracking
* ✅ Responsive UI optimized for mobile and desktop

---

## 🖥️ Tech Stack

* **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
* **Bundler**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
* **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/)
* **Linting/Formatting**: ESLint, Prettier
* **Git Hooks**: Husky, lint-staged
* **CI/CD**: GitHub Actions

---

## 🛆 Installation

```bash
git clone https://github.com/yourusername/english-word-trainer.git
cd english-word-trainer
npm install
```

```bash
npm run dev
```

Application will be available at [http://localhost:5173](http://localhost:5173)

---

## 🧪 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Create production build
npm run preview     # Preview production build
npm run lint        # Run ESLint checks
npm run lint:fix    # Auto-fix linting issues
npm run test        # Run tests
```

---

## 🧰 Tooling & Git Hooks

### ESLint & Prettier

Ensures consistent style and code quality.

```bash
npm run lint
npm run lint:fix
```

### Husky & lint-staged

Pre-commit hooks to enforce standards on staged files.

Enable Husky:

```bash
npm run prepare
```

Add pre-commit hook:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

Then in `package.json`:

```json
"lint-staged": {
  "*.{js,ts,jsx,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

---

## 💡 Future Enhancements

* 🔄 Word translation history
* 🔎 AI-generated context sentences
* 📊 Visualized learning stats
* 🎧 Pronunciation practice

---

## 🗞️ License

This project is licensed under the [MIT License](./LICENSE).
