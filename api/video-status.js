export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Méthode non autorisée."
    });
  }

  try {
    const apiKey = process.env.AGNES_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "AGNES_API_KEY n'est pas configurée."
      });
    }

    const { video_id } = req.query || {};

    if (!video_id) {
      return res.status(400).json({
        error: "video_id est obligatoire."
      });
    }

    const response = await fetch(
      `https://apihub.agnes-ai.com/v1/videos/${encodeURIComponent(video_id)}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Impossible de récupérer le statut de la vidéo.",
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      video_id,
      provider: "agnes",
      status: data.status,
      video_url: data.video_url || data.url || null,
      raw: data
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération du statut.",
      details: error.message
    });
  }
}
