// netlify/functions/brawl-proxy.js
// ──────────────────────────────────────────────────────────────────
// Proxy Netlify pour l'API officielle Brawl Stars
// Ce fichier contourne les restrictions CORS et protège votre clé API.
//
// DÉPLOIEMENT :
//   1. Placez ce fichier dans : netlify/functions/brawl-proxy.js
//   2. Dans Netlify → Site Settings → Environment Variables, ajoutez :
//      BRAWL_API_KEY = <votre token JWT depuis developer.brawlstars.com>
//   3. Déployez votre site sur Netlify (push sur votre branche principale).
//
// UTILISATION DEPUIS LE FRONT-END :
//   fetch('/.netlify/functions/brawl-proxy?tag=%23XXXXXXXX')
// ──────────────────────────────────────────────────────────────────

exports.handler = async (event) => {

  // ── CORS preflight ──────────────────────────────────────────────
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: ''
    };
  }

  // ── Récupération du tag ─────────────────────────────────────────
  const tag = event.queryStringParameters?.tag;

  if (!tag) {
    return jsonResponse(400, { error: 'Paramètre "tag" manquant.' });
  }

  // Encodage sécurisé : '#' → '%23'
  const encodedTag = tag.startsWith('%23') ? tag : encodeURIComponent(tag.replace(/^#/, '#'));

  // ── Clé API (variable d'environnement Netlify) ──────────────────
  const apiKey = process.env.BRAWL_API_KEY;

  if (!apiKey) {
    return jsonResponse(500, {
      error: 'Variable d\'environnement BRAWL_API_KEY non définie.',
      hint:  'Ajoutez-la dans Netlify → Site Settings → Environment Variables.'
    });
  }

  // ── Appel à l'API Brawl Stars ───────────────────────────────────
  const apiUrl = `https://api.brawlstars.com/v1/players/${encodedTag}`;

  try {
    const apiRes = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept':        'application/json'
      }
    });

    const body = await apiRes.text();

    // On transmet le statut et le corps tels quels
    return {
      statusCode: apiRes.status,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // cache 60s pour éviter le rate-limit
      },
      body
    };

  } catch (err) {
    console.error('[brawl-proxy] Erreur réseau :', err);
    return jsonResponse(502, {
      error: 'Impossible de contacter l\'API Brawl Stars.',
      detail: err.message
    });
  }
};

// ── Utilitaires ─────────────────────────────────────────────────

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function jsonResponse(statusCode, obj) {
  return {
    statusCode,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  };
}
