# DimDev Portfolio - Landing Page & Portfolio

🚀 Portfolio moderne avec CMS Notion, intégration Stripe, et booking Calendly.

## 🎨 Stack Technique

### Frontend
- **Next.js 14** (App Router)
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **Lucide Icons** pour les icônes

### Backend & Services
- **Notion API** pour le CMS des projets
- **Stripe** pour les paiements
- **Brevo** pour l'envoi d'emails
- **Google Analytics** (react-ga4)
- **Calendly** pour les réservations

### DevOps & Déploiement
- **Vercel** pour l'hébergement
- **Docker** ready
- **Git** pour le versioning

## 📦 Installation

### 1. Cloner le projet
```bash
git clone <your-repo-url>
cd dimdev-portfolio
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration des variables d'environnement

Copier `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

Variables requises :

#### Notion CMS
```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```
📖 Voir [NOTION_SETUP.md](./NOTION_SETUP.md) pour la configuration complète

#### Stripe (optionnel pour MVP)
```env
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

#### Email (Brevo)
```env
BREVO_API_KEY=your_brevo_api_key
EMAIL_FROM=contact@dimdev.com
```

#### Analytics
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Calendly (optionnel)
```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
```

### 4. Lancer en développement
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via le site Vercel (Recommandé)

1. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Importer votre repository GitHub
   - Sélectionner "dimdev-portfolio"

3. **Configurer les variables d'environnement**
   - Dans Vercel, aller dans "Settings" > "Environment Variables"
   - Ajouter toutes les variables de `.env.local` :
     - `NOTION_API_KEY`
     - `NOTION_DATABASE_ID`
     - `NEXT_PUBLIC_GA_ID`
     - `BREVO_API_KEY`
     - `EMAIL_FROM`
     - `STRIPE_SECRET_KEY` (si utilisé)
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (si utilisé)
     - `NEXT_PUBLIC_CALENDLY_URL` (quand configuré)

4. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre quelques minutes
   - Votre site est live ! 🎉

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## 📂 Structure du Projet

```
dimdev-portfolio/
├── app/
│   ├── layout.tsx          # Layout principal avec fonts
│   ├── page.tsx            # Page d'accueil
│   ├── works/              # Portfolio
│   │   ├── page.tsx        # Liste des projets
│   │   └── [slug]/         # Détail projet
│   ├── services/           # Page services/pricing
│   ├── contact/            # Page contact
│   └── api/
│       └── contact/        # API route pour formulaire
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navigation
│   │   └── Footer.tsx      # Pied de page
│   ├── sections/
│   │   ├── Hero.tsx        # Section hero
│   │   ├── Services.tsx    # Grille services
│   │   ├── PortfolioPreview.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── Button.tsx      # Composant bouton
│       ├── Card.tsx        # Composant carte
│       └── BookingWidget.tsx  # Widget Calendly
├── lib/
│   ├── constants.ts        # Config site & services
│   ├── types.ts           # Types TypeScript
│   ├── notion.ts          # Client Notion API
│   ├── analytics.ts       # Google Analytics
│   └── utils.ts           # Utilitaires
├── public/
│   └── images/            # Assets images
└── tailwind.config.ts     # Config Tailwind (couleurs FETRA)
```

## 🎨 Personnalisation

### Couleurs (Palette FETRA)

Défini dans `tailwind.config.ts` :

```typescript
colors: {
  primary: "#556B2F",    // Olive foncé
  accent: "#FF6B8A",     // Rose corail
  dark: "#0B0B0B",       // Noir profond
  surface: "#F6F5F3",    // Gris chaud
}
```

### Modifier le contenu

Éditer `lib/constants.ts` pour :
- Informations de contact
- Services & prix
- Liens réseaux sociaux
- Stack technique

### Ajouter des projets

1. Aller dans votre database Notion
2. Ajouter une nouvelle ligne
3. Remplir tous les champs requis
4. Mettre `Status` à "Published"
5. Attendre la revalidation (1h) ou redémarrer le serveur

## 📊 Analytics & Tracking

### Google Analytics

1. Créer une propriété GA4 sur [analytics.google.com](https://analytics.google.com)
2. Copier l'ID de mesure (format: `G-XXXXXXXXXX`)
3. Ajouter à `.env.local` : `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

### Events trackés automatiquement
- Clics sur CTAs
- Navigation entre pages
- Soumission formulaire contact
- Clics sur projets

## 📧 Configuration Email (Brevo)

1. Créer un compte sur [brevo.com](https://brevo.com) (anciennement Sendinblue)
2. Vérifier votre domaine ou utiliser l'email par défaut
3. Aller dans "SMTP & API" > "API Keys"
4. Créer une nouvelle clé API
5. Ajouter à `.env.local` :
   ```env
   BREVO_API_KEY=your_brevo_api_key
   EMAIL_FROM=contact@votre-domaine.com
   ```

## 📅 Configuration Calendly (Optionnel)

1. Créer un compte sur [calendly.com](https://calendly.com)
2. Configurer un type d'événement (ex: "Appel découverte 30min")
3. Copier votre lien Calendly
4. Ajouter à `.env.local` :
   ```env
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min
   ```

Sans Calendly, le bouton redirigera vers `/contact`

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

## 🐛 Troubleshooting

### Projets Notion n'apparaissent pas
- Vérifier que `NOTION_API_KEY` et `NOTION_DATABASE_ID` sont corrects
- Vérifier que la database est partagée avec l'intégration
- Vérifier que `Status` est "Published"
- Redémarrer le serveur

### Erreur de build
```bash
# Nettoyer et réinstaller
rm -rf node_modules .next
npm install
npm run build
```

### Images ne s'affichent pas
- Ajouter le domaine dans `next.config.js` :
```javascript
images: {
  domains: ['your-image-domain.com'],
}
```

## 📝 TODO / Prochaines étapes

- [ ] Ajouter authentification NextAuth pour espace client
- [ ] Intégrer Stripe Checkout pour paiements
- [ ] Ajouter blog avec MDX
- [ ] Tests E2E avec Playwright
- [ ] Optimisation SEO avancée
- [ ] Mode sombre
- [ ] Animations Framer Motion avancées

## 📄 License

MIT License - Libre d'utilisation

## 🤝 Support

Pour toute question :
- Email : contact@dimdev.com
- LinkedIn : [Votre profil]
- GitHub : [Votre profil]

---

**Made with ❤️ and Next.js by DimDev**
