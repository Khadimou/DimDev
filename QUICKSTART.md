# 🚀 Guide de Démarrage Rapide - DimDev Portfolio

## ⚡ Déploiement Express (5 minutes)

### 1. Configuration Notion (2 min)

1. Créer une intégration Notion : https://www.notion.so/my-integrations
   - Nom : "DimDev Portfolio"
   - Copier la clé API : `secret_xxxxx`

2. Créer une database "Projects" dans Notion
   - Ajouter les propriétés (voir NOTION_SETUP.md)
   - Partager la database avec l'intégration
   - Copier l'ID de la database depuis l'URL

3. Créer un projet test dans la database :
   ```
   Name: Test Project
   Slug: test-project
   Description: Un projet de test
   Status: Published
   Featured: ✓
   Tags: Web
   Stack: Next.js, TypeScript
   ```

### 2. Déploiement sur Vercel (3 min)

#### Option A : Avec GitHub (Recommandé)

```bash
# 1. Initialiser Git et pousser
git init
git add .
git commit -m "Initial commit"

# 2. Créer un repo GitHub et pousser
git remote add origin https://github.com/VOTRE-USERNAME/dimdev-portfolio.git
git branch -M main
git push -u origin main

# 3. Aller sur vercel.com
# - Importer le repo GitHub
# - Configurer les variables d'environnement :
```

**Variables Vercel à ajouter :**
```
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optionnel)
EMAIL_FROM=contact@dimdev.com
```

#### Option B : Avec Vercel CLI

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Déployer
vercel

# 4. Ajouter les variables d'environnement
vercel env add NOTION_API_KEY
vercel env add NOTION_DATABASE_ID

# 5. Redéployer
vercel --prod
```

### 3. Vérification

1. Votre site est live à l'URL Vercel (ex: dimdev-portfolio.vercel.app)
2. Vérifier que votre projet test apparaît sur la page d'accueil
3. Tester la navigation entre les pages

## 🎨 Personnalisation Rapide

### Modifier les infos de contact

Éditer `lib/constants.ts` :

```typescript
export const SITE_CONFIG = {
  name: "VotreNom",
  email: "votre@email.com",
  social: {
    linkedin: "https://linkedin.com/in/votre-profil",
    github: "https://github.com/votre-profil",
    // ...
  },
};
```

### Modifier les services et prix

Dans `lib/constants.ts`, éditer `SERVICES` :

```typescript
export const SERVICES = [
  {
    id: "poc-express",
    title: "POC Express",
    price: "À partir de 400 €", // ← Modifier ici
    duration: "3-5 jours",
    features: [
      // Vos features...
    ],
  },
  // ...
];
```

### Changer les couleurs

Dans `tailwind.config.ts` :

```typescript
colors: {
  primary: "#556B2F",    // Olive foncé
  accent: "#FF6B8A",     // Rose corail - changez ici
  dark: "#0B0B0B",
  surface: "#F6F5F3",
}
```

Après modification, commiter et pousser :
```bash
git add .
git commit -m "Personnalisation du site"
git push
```

Vercel déploiera automatiquement ! 🎉

## 📧 Setup Email (Optionnel)

### Brevo (Gratuit pour 300 emails/jour)

1. Créer un compte : https://brevo.com (anciennement Sendinblue)
2. Vérifier votre domaine ou utiliser l'email par défaut
3. Aller dans "SMTP & API" > "API Keys"
4. Créer une nouvelle clé API
5. Ajouter dans Vercel :
   ```
   BREVO_API_KEY=your_brevo_api_key
   EMAIL_FROM=contact@votre-domaine.com
   ```

## 📊 Google Analytics (Optionnel)

1. Créer une propriété GA4 : https://analytics.google.com
2. Copier l'ID de mesure (G-XXXXXXXXXX)
3. Ajouter dans Vercel :
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

## 📅 Calendly (Optionnel)

1. Créer un compte : https://calendly.com
2. Configurer un événement (ex: "Appel 30min")
3. Copier votre lien Calendly
4. Ajouter dans Vercel :
   ```
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/votre-username/30min
   ```

## 🆘 Problèmes Courants

### "Unauthorized" sur Notion
- Vérifier que la database est partagée avec l'intégration
- Vérifier que la clé API est correcte

### Projet n'apparaît pas
- Vérifier que `Status` est "Published" dans Notion
- Attendre 1h (revalidation automatique) ou redéployer

### Images ne s'affichent pas
- Les images Notion fonctionnent automatiquement
- Pour images externes, ajouter le domaine dans `next.config.js`

## 📱 Domaine Personnalisé

Dans Vercel :
1. Settings > Domains
2. Ajouter votre domaine
3. Configurer les DNS chez votre registrar

## 🎯 Prochaines Étapes

1. ✅ Ajouter vos vrais projets dans Notion
2. ✅ Personnaliser les textes et prix
3. ✅ Ajouter vos liens sociaux
4. ✅ Configurer votre domaine
5. ✅ Tester le formulaire de contact
6. ✅ Partager votre portfolio ! 🚀

## 📞 Besoin d'aide ?

- Documentation complète : voir README.md
- Setup Notion détaillé : voir NOTION_SETUP.md

---

**Temps total : ~5-10 minutes** ⏱️
