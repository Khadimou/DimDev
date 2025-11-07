# 💳 Configuration Stripe - Guide Complet

Ce guide vous explique comment configurer Stripe pour accepter les paiements sur votre site.

---

## 📋 Table des matières

1. [Création du compte Stripe](#1-création-du-compte-stripe)
2. [Configuration des produits et prix](#2-configuration-des-produits-et-prix)
3. [Configuration des clés API](#3-configuration-des-clés-api)
4. [Configuration du webhook](#4-configuration-du-webhook)
5. [Tests en mode test](#5-tests-en-mode-test)
6. [Passage en mode live](#6-passage-en-mode-live)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Création du compte Stripe

### 1.1 Créer un compte

1. Aller sur [stripe.com](https://stripe.com)
2. Cliquer sur **"Start now"** ou **"Commencer"**
3. Créer un compte avec votre email professionnel
4. Valider votre email

### 1.2 Activer votre compte

1. Compléter votre profil entreprise
2. Fournir les informations légales (SIRET, adresse, etc.)
3. Ajouter vos informations bancaires pour recevoir les paiements
4. Vérifier votre identité (pièce d'identité si demandé)

⚠️ **Note** : Vous pouvez utiliser le mode test immédiatement, mais vous devrez activer votre compte pour accepter de vrais paiements.

---

## 2. Configuration des produits et prix

### 2.1 Accéder à la section Produits

1. Dans le Dashboard Stripe, aller dans **"Produits"** (Products)
2. Cliquer sur **"+ Ajouter un produit"** (Add product)

### 2.2 Créer le produit "POC Express"

**Informations du produit :**
- **Nom** : POC Express
- **Description** : Prototype fonctionnel pour valider l'idée et convaincre des partenaires
- **Image** : (optionnel) Uploader une image

**Configuration du prix :**
- **Modèle de tarification** : Paiement unique (One-time)
- **Prix** : 400 EUR
- **Nom du prix** : POC Express - Paiement unique

Cliquer sur **"Save product"**

### 2.3 Récupérer le Price ID pour POC Express

1. Dans la page du produit, aller dans l'onglet **"Pricing"**
2. Cliquer sur le prix que vous venez de créer
3. Copier l'**ID du prix** (commence par `price_`)
   - Format test : `price_1xxxxxxxxxxxxxxxxxxxxxx`
   - Exemple : `price_1ABCDEF1234567890xyz`

📝 **Sauvegarder** : `STRIPE_PRICE_POC=price_xxxxx`

### 2.4 Créer le produit "Starter MVP"

**Informations du produit :**
- **Nom** : Starter MVP
- **Description** : Produit utilisable par des premiers utilisateurs avec fonctionnalités complètes
- **Image** : (optionnel)

**Configuration du prix :**
- **Modèle de tarification** : Paiement unique (One-time)
- **Prix** : 1200 EUR
- **Nom du prix** : Starter MVP - Paiement unique

Cliquer sur **"Save product"**

### 2.5 Récupérer le Price ID pour Starter MVP

Même procédure que pour POC Express :
1. Aller dans l'onglet **"Pricing"**
2. Copier l'**ID du prix**

📝 **Sauvegarder** : `STRIPE_PRICE_MVP=price_xxxxx`

---

## 3. Configuration des clés API

### 3.1 Accéder aux clés API

1. Dans le Dashboard Stripe, aller dans **"Developers"** > **"API keys"**
2. Vous verrez deux sections : **Test mode** et **Live mode**

### 3.2 Récupérer les clés de test

**Pour débuter, utiliser les clés TEST :**

1. **Publishable key** (clé publique)
   - Format : `pk_test_xxxxxxxxxxxxxx`
   - Visible par le client (frontend)
   - Copier cette clé

   📝 **Sauvegarder** : `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx`

2. **Secret key** (clé secrète)
   - Cliquer sur **"Reveal test key"** pour l'afficher
   - Format : `sk_test_xxxxxxxxxxxxxx`
   - ⚠️ **NE JAMAIS** partager cette clé
   - ⚠️ **NE JAMAIS** la mettre dans le code frontend
   - Copier cette clé

   📝 **Sauvegarder** : `STRIPE_SECRET_KEY=sk_test_xxxxx`

### 3.3 Récupérer les clés live (pour la production)

**⚠️ À faire uniquement quand votre compte est activé et que vous avez testé en mode test**

1. Basculer sur **"Live mode"** (toggle en haut à droite)
2. Copier les clés live :
   - `pk_live_xxxxxxxxxxxxxx` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `sk_live_xxxxxxxxxxxxxx` → `STRIPE_SECRET_KEY`

---

## 4. Configuration du webhook

### 4.1 Pourquoi un webhook ?

Le webhook permet à Stripe de notifier votre application quand un paiement est réussi, échoué, etc.
Sans webhook, vous ne saurez pas qu'un client a payé !

### 4.2 Créer l'endpoint webhook

1. Dans le Dashboard Stripe, aller dans **"Developers"** > **"Webhooks"**
2. Cliquer sur **"+ Add endpoint"**

### 4.3 Configuration de l'endpoint

**URL de l'endpoint :**
```
https://dimdev.pro/api/stripe/webhook
```

**Events à écouter :**
- Cliquer sur **"Select events"**
- Cocher :
  - ✅ `checkout.session.completed`
  - ✅ `payment_intent.succeeded`
  - ✅ `payment_intent.payment_failed`

Cliquer sur **"Add endpoint"**

### 4.4 Récupérer le Webhook Secret

1. Une fois l'endpoint créé, cliquer dessus
2. Dans la section **"Signing secret"**, cliquer sur **"Reveal"**
3. Copier le secret (commence par `whsec_`)

📝 **Sauvegarder** : `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

### 4.5 Webhook pour développement local

**Pour tester en local (localhost), utiliser Stripe CLI :**

1. **Installer Stripe CLI** :
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Linux
   # Télécharger depuis https://stripe.com/docs/stripe-cli
   ```

2. **Se connecter** :
   ```bash
   stripe login
   ```

3. **Forwarder les webhooks vers localhost** :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copier le webhook secret** affiché dans le terminal
   ```
   Ready! Your webhook signing secret is whsec_xxxxx (^C to quit)
   ```

5. **Ajouter dans `.env.local`** :
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

---

## 5. Tests en mode test

### 5.1 Configuration locale

**Créer `.env.local` à la racine du projet :**

```env
# Notion
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx

# Stripe TEST
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_POC=price_xxxxx
STRIPE_PRICE_MVP=price_xxxxx
NEXT_PUBLIC_URL=http://localhost:3000

# Brevo
BREVO_API_KEY=xkeysib-xxxxx
EMAIL_FROM=contact@dimdev.pro

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/dimdev/30min
```

### 5.2 Lancer le serveur

```bash
npm run dev
```

### 5.3 Tester un paiement

1. **Aller sur** : http://localhost:3000/services
2. **Cliquer sur** : "Commander - À partir de 400 €" (POC Express)
3. **Vous êtes redirigé vers Stripe Checkout**

**Utiliser une carte de test :**
- **Numéro** : `4242 4242 4242 4242`
- **Expiration** : N'importe quelle date future (ex: 12/25)
- **CVC** : N'importe quel code à 3 chiffres (ex: 123)
- **Nom** : Votre nom
- **Email** : Votre email

4. **Valider le paiement**
5. **Vous êtes redirigé vers** : `/checkout/success`
6. **Vérifier** :
   - Vous recevez un email de confirmation
   - Vous (admin) recevez un email de notification
   - Le paiement apparaît dans Stripe Dashboard

### 5.4 Cartes de test supplémentaires

**Paiement réussi** :
- `4242 4242 4242 4242` - Visa
- `5555 5555 5555 4444` - Mastercard

**Paiement refusé** :
- `4000 0000 0000 0002` - Carte refusée
- `4000 0000 0000 9995` - Fonds insuffisants

**3D Secure (authentification requise)** :
- `4000 0027 6000 3184` - Authentification réussie

Plus de cartes : [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

### 5.5 Vérifier les webhooks

**En local avec Stripe CLI** :

1. Dans un autre terminal, lancer :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

2. Effectuer un paiement test
3. Voir les événements dans le terminal :
   ```
   2024-03-20 15:30:45   --> checkout.session.completed [evt_xxxxx]
   2024-03-20 15:30:45  <--  [200] POST http://localhost:3000/api/stripe/webhook [evt_xxxxx]
   ```

**Dans Stripe Dashboard** :
1. Aller dans **"Developers"** > **"Webhooks"**
2. Cliquer sur votre endpoint
3. Voir les événements envoyés et les réponses

---

## 6. Passage en mode live

### 6.1 Activer votre compte Stripe

⚠️ **Prérequis** :
- Compte Stripe activé (informations légales + bancaires renseignées)
- Tests réussis en mode test
- Site déployé sur Vercel avec HTTPS

### 6.2 Créer les produits en mode live

**⚠️ Important** : Les produits et prix créés en mode test ne sont PAS disponibles en mode live !

1. **Basculer en mode Live** (toggle en haut à droite du Dashboard)
2. **Recréer les produits** :
   - POC Express - 400 EUR
   - Starter MVP - 1200 EUR
3. **Copier les nouveaux Price IDs** (ils seront différents !)

### 6.3 Configurer le webhook en mode live

1. **Basculer en mode Live**
2. **Developers** > **Webhooks** > **+ Add endpoint**
3. **URL** : `https://dimdev.pro/api/stripe/webhook`
4. **Events** : checkout.session.completed, payment_intent.succeeded, payment_intent.payment_failed
5. **Copier le Webhook Secret**

### 6.4 Mettre à jour Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Sélectionner votre projet
3. **Settings** > **Environment Variables**
4. **Mettre à jour les variables** (mode LIVE) :
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx  (nouveau secret live)
   STRIPE_PRICE_POC=price_xxxxx  (nouveau price ID live)
   STRIPE_PRICE_MVP=price_xxxxx  (nouveau price ID live)
   NEXT_PUBLIC_URL=https://dimdev.pro
   ```

5. **Redéployer** :
   - Deployments > ... > Redeploy

### 6.5 Tester en production

1. **Aller sur** : https://dimdev.pro/services
2. **Faire un petit paiement test** avec une vraie carte (vous pouvez le rembourser après)
3. **Vérifier** :
   - Paiement réussi
   - Redirection vers success page
   - Emails reçus
   - Paiement dans Stripe Dashboard (mode Live)
   - Webhook déclenché

4. **Rembourser le test** :
   - Stripe Dashboard > Payments
   - Cliquer sur le paiement > Refund

---

## 7. Troubleshooting

### ❌ Erreur : "No such price"

**Cause** : Le Price ID est incorrect ou vous êtes en mode test/live mais utilisez un ID de l'autre mode

**Solution** :
- Vérifier que les Price IDs correspondent au mode (test ou live)
- En mode test : `price_` doit venir des produits en mode test
- En mode live : `price_` doit venir des produits en mode live

### ❌ Erreur : "Webhook signature verification failed"

**Cause** : Le Webhook Secret est incorrect

**Solution** :
1. Vérifier `STRIPE_WEBHOOK_SECRET` dans `.env.local` ou Vercel
2. Le secret doit correspondre à l'endpoint webhook configuré
3. En local : utiliser le secret du `stripe listen`
4. En production : utiliser le secret du Dashboard Stripe

### ❌ Les emails ne sont pas envoyés

**Cause** : Webhook non déclenché ou erreur Brevo

**Solution** :
1. Vérifier que le webhook est bien configuré
2. Vérifier les logs dans Stripe Dashboard > Webhooks
3. Vérifier `BREVO_API_KEY` et `EMAIL_FROM`
4. Voir les logs Vercel : Functions > /api/stripe/webhook

### ❌ Erreur : "Configuration de prix invalide"

**Cause** : `STRIPE_PRICE_POC` ou `STRIPE_PRICE_MVP` non défini

**Solution** :
1. Vérifier que les variables d'environnement sont définies
2. Redéployer Vercel après ajout des variables
3. Vérifier que les Price IDs existent dans Stripe

### ❌ Redirection vers cancel au lieu de success

**Cause** : L'utilisateur a annulé ou le paiement a échoué

**Solution** :
- C'est normal si l'utilisateur annule
- Si automatique : vérifier la carte de test
- Vérifier les logs dans Stripe Dashboard

### ❌ Erreur CORS ou "Failed to fetch"

**Cause** : Problème de configuration Next.js ou API

**Solution** :
1. Vérifier que l'API route existe : `app/api/checkout/route.ts`
2. Redémarrer le serveur de développement
3. Vérifier la console navigateur pour l'erreur exacte

---

## 📊 Monitoring et suivi

### Tableau de bord Stripe

**À surveiller régulièrement** :
- **Payments** : Liste des paiements reçus
- **Customers** : Liste de vos clients
- **Webhooks** : Vérifier que les webhooks sont bien déclenchés (200 OK)
- **Reports** : Rapports financiers et exports

### Alertes Stripe

**Configurer des alertes email** :
1. Settings > Notifications
2. Activer :
   - ✅ Successful payments
   - ✅ Failed payments
   - ✅ Disputes
   - ✅ Refunds

### Google Analytics (optionnel)

Le code tracking est déjà en place. Chaque paiement déclenche un événement GA4.

---

## 🔒 Sécurité et bonnes pratiques

### ✅ À faire

- ✅ Toujours tester en mode test avant de passer en live
- ✅ Ne jamais commit les clés secrètes dans Git
- ✅ Utiliser des variables d'environnement
- ✅ Vérifier la signature des webhooks
- ✅ Logger les erreurs mais pas les données sensibles
- ✅ Activer les alertes Stripe
- ✅ Surveiller les paiements frauduleux (Stripe Radar)

### ❌ À ne pas faire

- ❌ Exposer `STRIPE_SECRET_KEY` côté client
- ❌ Désactiver la vérification des webhooks
- ❌ Accepter des paiements sans webhook
- ❌ Hardcoder les Price IDs dans le code
- ❌ Utiliser les clés test en production

---

## 📞 Support

### Documentation officielle
- Stripe Docs : [https://stripe.com/docs](https://stripe.com/docs)
- Stripe API : [https://stripe.com/docs/api](https://stripe.com/docs/api)
- Cartes de test : [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

### Communauté
- Stripe Discord : [https://stripe.com/discord](https://stripe.com/discord)
- Stack Overflow : Tag `stripe`

---

## ✅ Checklist finale

Avant de passer en production, vérifier :

**Configuration Stripe :**
- [ ] Compte Stripe activé
- [ ] Produits créés en mode live
- [ ] Price IDs récupérés
- [ ] Webhook configuré en mode live
- [ ] Webhook secret récupéré

**Variables d'environnement Vercel :**
- [ ] `STRIPE_SECRET_KEY` (live)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (live)
- [ ] `STRIPE_WEBHOOK_SECRET` (live)
- [ ] `STRIPE_PRICE_POC` (live)
- [ ] `STRIPE_PRICE_MVP` (live)
- [ ] `NEXT_PUBLIC_URL=https://dimdev.pro`
- [ ] `BREVO_API_KEY`
- [ ] `EMAIL_FROM`

**Tests :**
- [ ] Paiement test réussi en mode live
- [ ] Email de confirmation reçu
- [ ] Email admin reçu
- [ ] Webhook déclenché (200 OK)
- [ ] Paiement visible dans Dashboard Stripe
- [ ] Remboursement du paiement test effectué

**Sécurité :**
- [ ] Clés secrètes non exposées
- [ ] Webhook signature vérifiée
- [ ] Alertes Stripe activées

---

**Temps total de configuration** : ~45 minutes

🎉 Vous êtes prêt à accepter des paiements !
