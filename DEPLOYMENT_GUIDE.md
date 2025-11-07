# 🚀 Guide de Déploiement - dimdev.pro sur Vercel

## 📋 Prérequis

- [ ] Compte GitHub avec le repo DimDev
- [ ] Compte Vercel (gratuit) - [vercel.com](https://vercel.com)
- [ ] Domaine dimdev.pro acheté
- [ ] Clés API prêtes :
  - Notion API Key
  - Notion Database ID
  - Brevo API Key
  - Stripe Keys (optionnel)
  - Google Analytics ID (optionnel)

---

## 🔄 Étape 1 : Fusionner les changements vers main

Actuellement, les changements Brevo sont sur la branche `claude/brevo-migration-011CUsKq7cCac528vfTNVri9`.

### Option A : Via Pull Request (Recommandé)
```bash
# Créer une PR sur GitHub
# URL : https://github.com/Khadimou/DimDev/pull/new/claude/brevo-migration-011CUsKq7cCac528vfTNVri9
# Puis merger la PR
```

### Option B : Merge local et push
```bash
git checkout main
git merge claude/brevo-migration-011CUsKq7cCac528vfTNVri9
git push origin main
```

---

## 🌐 Étape 2 : Déployer sur Vercel

### 2.1 Connexion à Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Autoriser Vercel à accéder à vos repos

### 2.2 Import du projet

1. Cliquer sur **"Add New..."** > **"Project"**
2. Sélectionner le repo **Khadimou/DimDev**
3. Vercel détectera automatiquement Next.js

### 2.3 Configuration du projet

**Framework Preset** : Next.js (détecté automatiquement)

**Build Command** : `npm run build` (par défaut)

**Output Directory** : `.next` (par défaut)

**Install Command** : `npm install` (par défaut)

### 2.4 Variables d'environnement

⚠️ **IMPORTANT** : Ajouter toutes ces variables avant de déployer

#### Variables obligatoires

```env
# Notion CMS
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx

# Email (Brevo)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxx
EMAIL_FROM=contact@dimdev.pro
```

#### Variables optionnelles

```env
# Stripe (si vous utilisez les paiements)
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/dimdev/30min
```

**Comment ajouter les variables** :
1. Dans Vercel, section "Environment Variables"
2. Ajouter une par une : Name + Value
3. Sélectionner "Production, Preview, Development" pour chaque variable

### 2.5 Déployer

1. Cliquer sur **"Deploy"**
2. Attendre 2-3 minutes
3. Vercel vous donnera une URL temporaire : `dimdev-xxxx.vercel.app`
4. ✅ Tester que le site fonctionne

---

## 🌍 Étape 3 : Configurer le domaine dimdev.pro

### 3.1 Ajouter le domaine dans Vercel

1. Dans votre projet Vercel, aller dans **Settings** > **Domains**
2. Cliquer sur **"Add"**
3. Entrer : `dimdev.pro`
4. Cliquer sur **"Add"**
5. Ajouter aussi : `www.dimdev.pro` (optionnel mais recommandé)

### 3.2 Récupérer les enregistrements DNS

Vercel vous donnera 2 options :

#### Option A : Nameservers Vercel (Plus simple - Recommandé)
Vercel vous donnera des nameservers du type :
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option B : Enregistrements DNS manuels
Si vous gardez vos propres nameservers :
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 Configurer chez votre registrar (où vous avez acheté dimdev.pro)

#### Si vous avez acheté sur Namecheap :
1. Aller sur [namecheap.com](https://namecheap.com)
2. Dashboard > Manage > Domain List
3. Cliquer sur **Manage** à côté de dimdev.pro
4. Aller dans **Nameservers**

**Option A - Nameservers Vercel** (Recommandé) :
- Sélectionner "Custom DNS"
- Ajouter les nameservers de Vercel
- Sauvegarder

**Option B - DNS Records** :
- Aller dans "Advanced DNS"
- Ajouter les enregistrements A et CNAME fournis par Vercel
- Sauvegarder

#### Si vous avez acheté sur GoDaddy :
1. Aller sur [godaddy.com](https://godaddy.com)
2. My Products > Domains > dimdev.pro
3. DNS > Manage DNS

**Option A - Nameservers** :
- Aller dans "Nameservers"
- Cliquer "Change"
- Sélectionner "Enter my own nameservers"
- Ajouter les nameservers Vercel

**Option B - DNS Records** :
- Ajouter un enregistrement A : @ → 76.76.21.21
- Ajouter un enregistrement CNAME : www → cname.vercel-dns.com

#### Si vous avez acheté sur OVH :
1. Aller sur [ovh.com](https://ovh.com)
2. Domaines > dimdev.pro
3. Zone DNS

**Option A - Serveurs DNS** :
- Onglet "Serveurs DNS"
- "Modifier les serveurs DNS"
- Ajouter les nameservers Vercel

**Option B - Zone DNS** :
- Supprimer les anciens enregistrements A et CNAME
- Ajouter : A @ 76.76.21.21
- Ajouter : CNAME www cname.vercel-dns.com

### 3.4 Vérification et propagation

1. **Temps de propagation** :
   - Nameservers : 24-48h (rare, souvent 1-2h)
   - DNS Records : 5 minutes à 2h

2. **Vérifier la propagation** :
   - Outil : [whatsmydns.net](https://www.whatsmydns.net)
   - Entrer : `dimdev.pro`
   - Vérifier que l'IP pointe vers Vercel

3. **Tester** :
   - Ouvrir : https://dimdev.pro
   - Ouvrir : https://www.dimdev.pro
   - Vérifier que HTTPS fonctionne (Vercel génère automatiquement le certificat SSL)

---

## ✅ Étape 4 : Configuration post-déploiement

### 4.1 Configurer Brevo avec dimdev.pro

1. Aller sur [app.brevo.com](https://app.brevo.com)
2. **Settings** > **Senders & IP**
3. Cliquer sur **"Add a sender"**
4. Ajouter : `contact@dimdev.pro`
5. Vérifier l'email (si demandé)

**Pour un domaine vérifié complet** (emails professionnels) :
1. **Settings** > **Senders & IP** > **Domains**
2. Cliquer **"Authenticate a domain"**
3. Ajouter `dimdev.pro`
4. Brevo vous donnera des enregistrements DNS (SPF, DKIM, DMARC)
5. Ajouter ces enregistrements chez votre registrar
6. Attendre la vérification (quelques heures)

### 4.2 Mettre à jour les variables Vercel

1. Dans Vercel > Settings > Environment Variables
2. Modifier : `EMAIL_FROM=contact@dimdev.pro`
3. Redéployer : Deployments > ... > Redeploy

### 4.3 Tester le formulaire de contact

1. Aller sur https://dimdev.pro/contact
2. Remplir le formulaire
3. Envoyer
4. Vérifier que vous recevez l'email sur contact@dimdev.pro

### 4.4 Configurer Google Analytics (optionnel)

1. Créer une propriété GA4 sur [analytics.google.com](https://analytics.google.com)
2. Ajouter le site web : `https://dimdev.pro`
3. Copier l'ID de mesure (G-XXXXXXXXXX)
4. Ajouter dans Vercel : `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
5. Redéployer

---

## 🔒 Étape 5 : Sécurité et optimisations

### 5.1 Vérifications de sécurité

- [ ] HTTPS activé automatiquement (Vercel)
- [ ] Variables d'environnement en Production only
- [ ] Clés API Stripe en mode production
- [ ] Authentification Brevo vérifiée

### 5.2 Optimisations Vercel

1. **Settings** > **General**
   - Node.js Version : 18.x ou 20.x (recommandé)

2. **Settings** > **Functions**
   - Region : Choisir la plus proche de vos utilisateurs (ex: Paris - cdg1)

3. **Analytics** (optionnel - payant)
   - Activer Web Analytics pour voir les performances

### 5.3 Redirections www

Dans Vercel, s'assurer que :
- `dimdev.pro` est le domaine principal
- `www.dimdev.pro` redirige vers `dimdev.pro` (ou inverse selon votre préférence)

---

## 📊 Étape 6 : Monitoring et maintenance

### 6.1 Vérifier les déploiements

- **Automatic deploys** : À chaque push sur `main`, Vercel redéploie automatiquement
- **Preview deploys** : Chaque PR crée un déploiement de preview

### 6.2 Logs et erreurs

1. Vercel Dashboard > Votre projet
2. **Functions** : Voir les logs des API routes
3. **Analytics** : Performances et erreurs

### 6.3 Notion CMS

- Ajouter vos vrais projets dans la database Notion
- Status : "Published" pour qu'ils apparaissent
- Revalidation automatique : 1h (défini dans le code)

---

## 🎉 Checklist finale

- [ ] Site accessible sur https://dimdev.pro
- [ ] HTTPS actif (cadenas vert)
- [ ] Page d'accueil s'affiche correctement
- [ ] Projets Notion apparaissent
- [ ] Formulaire de contact fonctionne
- [ ] Email reçu sur contact@dimdev.pro
- [ ] Google Analytics trackant (si configuré)
- [ ] Domaine www redirige correctement

---

## 🆘 Troubleshooting

### Le site ne s'affiche pas sur dimdev.pro

**Problème** : DNS pas encore propagé
**Solution** : Attendre 1-2h, vérifier sur whatsmydns.net

**Problème** : Erreur SSL
**Solution** : Vercel génère le certificat automatiquement. Attendre 5-10 min après config DNS

### Projets Notion n'apparaissent pas

**Problème** : Variables d'environnement manquantes
**Solution** : Vérifier NOTION_API_KEY et NOTION_DATABASE_ID dans Vercel

**Problème** : Database pas partagée
**Solution** : Dans Notion, partager la database avec l'intégration

### Formulaire de contact ne fonctionne pas

**Problème** : BREVO_API_KEY invalide
**Solution** : Regénérer la clé sur Brevo et mettre à jour dans Vercel

**Problème** : Email FROM non vérifié
**Solution** : Vérifier le sender sur Brevo

### Build failed sur Vercel

**Problème** : Erreurs TypeScript
**Solution** :
```bash
npm run build
# Corriger les erreurs localement
git add .
git commit -m "Fix build errors"
git push
```

---

## 📞 Support

- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Documentation Next.js : [nextjs.org/docs](https://nextjs.org/docs)
- Documentation Brevo : [developers.brevo.com](https://developers.brevo.com)

---

**Temps total estimé** : 30-60 minutes (+ temps de propagation DNS)

🎯 **Objectif** : Votre portfolio professionnel accessible sur https://dimdev.pro
