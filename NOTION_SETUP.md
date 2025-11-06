# Configuration de la Database Notion

## Étapes de configuration

### 1. Créer une intégration Notion

1. Aller sur https://www.notion.so/my-integrations
2. Cliquer sur "+ New integration"
3. Nommer l'intégration "DimDev Portfolio"
4. Sélectionner votre workspace
5. Copier la clé API (Internal Integration Token)
6. Ajouter dans `.env.local` : `NOTION_API_KEY=secret_xxx`

### 2. Créer la database

1. Créer une nouvelle page dans Notion
2. Ajouter une database (Table view)
3. Nommer la database "Projects"

### 3. Configurer les propriétés

Ajouter les propriétés suivantes (respecter les types exactement) :

| Nom | Type | Description |
|-----|------|-------------|
| `Name` | Title | Titre du projet |
| `Slug` | Rich Text | URL slug (ex: fetra-beauty) |
| `Description` | Rich Text | Description courte |
| `Image` | Files & media | Image principale (16:9) |
| `Tags` | Multi-select | Tags (E-commerce, SaaS, etc.) |
| `Stack` | Multi-select | Technologies (Next.js, Python, etc.) |
| `Duration` | Rich Text | Durée (ex: "48h", "2 semaines") |
| `Role` | Rich Text | Votre rôle (ex: "Full-stack developer") |
| `Client` | Rich Text | Nom du client (optionnel) |
| `Results` | Rich Text | Résultats (un par ligne) |
| `LiveURL` | URL | Lien vers le site live |
| `GithubURL` | URL | Lien vers le repo GitHub |
| `Featured` | Checkbox | Afficher en page d'accueil |
| `DeliveryBadge` | Rich Text | Badge (ex: "Livré en 48h") |
| `Status` | Select | Published / Draft |
| `Created` | Created time | Date de création auto |

### 4. Créer les options pour Status

Dans la propriété `Status`, créer deux options :
- `Published` (vert)
- `Draft` (gris)

### 5. Exemples de tags

Dans `Tags`, créer :
- E-commerce
- SaaS
- Landing page
- Marketplace
- Dashboard
- Mobile
- IA

### 6. Exemples de stack

Dans `Stack`, créer :
- Next.js
- React
- TypeScript
- Python
- Django
- FastAPI
- Postgres
- Stripe
- Tailwind CSS
- Docker

### 7. Partager la database avec l'intégration

1. Ouvrir la page de la database
2. Cliquer sur "..." en haut à droite
3. Cliquer sur "Add connections"
4. Sélectionner votre intégration "DimDev Portfolio"

### 8. Récupérer l'ID de la database (DATABASE_ID)

**C'est l'étape que vous cherchez !** 🎯

#### Méthode détaillée :

1. **Ouvrir la database en plein écran**
   - Dans Notion, ouvrir votre database "Projects"
   - Cliquer sur les **6 points** ⋮⋮ en haut à gauche
   - Cliquer sur **"Open as page"** (ou **"Ouvrir en tant que page"**)
   - La database s'ouvre en pleine page dans votre navigateur

2. **Regarder l'URL dans la barre d'adresse**

   L'URL ressemble à ceci :
   ```
   https://www.notion.so/workspace-name/123456789abcdef123456789abcdef12?v=987654321
   ```

3. **Identifier le DATABASE_ID**

   Le DATABASE_ID est la **longue chaîne de 32 caractères** entre le dernier `/` et le `?`

   **Exemple visuel** :
   ```
   https://www.notion.so/mon-workspace/123456789abcdef123456789abcdef12?v=987654321
                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                           👆 VOTRE DATABASE_ID 👆
   ```

4. **Copier le DATABASE_ID**

   Sélectionner et copier uniquement cette partie :
   - **Avec tirets** : `12345678-9abc-def1-2345-6789abcdef12`
   - **Sans tirets** : `123456789abcdef123456789abcdef12`

   ✅ Les deux formats fonctionnent !

5. **Ajouter dans `.env.local`**
   ```env
   NOTION_DATABASE_ID=123456789abcdef123456789abcdef12
   ```

#### Exemple complet :

Si votre URL est :
```
https://www.notion.so/dimdev/8f5a2b1c3d4e5f6a7b8c9d0e1f2a3b4c?v=1234567890
```

Votre DATABASE_ID est : `8f5a2b1c3d4e5f6a7b8c9d0e1f2a3b4c`

#### ⚠️ Note importante :

- Le DATABASE_ID est **différent** de votre API Key (qui commence par `secret_`)
- Le DATABASE_ID fait **32 caractères** (avec ou sans tirets)
- Si vous ne voyez pas l'URL complète, **ouvrez la database en pleine page** d'abord

### 9. Créer un premier projet test

Créer une entrée avec ces valeurs :
- Name: "Test Project"
- Slug: "test-project"
- Description: "Projet de test pour valider l'intégration"
- Tags: E-commerce
- Stack: Next.js, TypeScript
- Duration: "1 semaine"
- Role: "Full-stack developer"
- Featured: ✓
- Status: Published

### 10. Tester

1. Redémarrer le serveur de développement
2. Aller sur http://localhost:3000
3. Votre projet devrait apparaître !

## Troubleshooting

### "Unauthorized" error
- Vérifier que la clé API est correcte
- Vérifier que la database est bien partagée avec l'intégration

### "Database not found"
- Vérifier l'ID de la database
- Vérifier que vous avez bien copié la partie avant le `?v=`

### Les projets n'apparaissent pas
- Vérifier que `Status` est bien "Published"
- Vérifier que tous les champs requis sont remplis

## Bonnes pratiques

1. Toujours utiliser des slugs uniques et en kebab-case
2. Utiliser des images 16:9 pour une meilleure présentation
3. Limiter à 3-4 tags par projet
4. Cocher `Featured` uniquement pour vos 3 meilleurs projets
5. Garder `Description` entre 100-150 caractères
