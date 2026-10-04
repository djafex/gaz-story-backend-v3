export default async function handler(req, res) {
  if (req.method !== "POST") {
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

    const {
      prompt,
      imageUrl,
      width = 768,
      height = 768,
      numFrames = 121,
      frameRate = 24
    } = req.body || {};

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        error: "Le prompt vidéo est obligatoire."
      });
    }

    const payload = {
      model: "agnes-video-v2.0",
      prompt,
      width,
      height,
      num_frames: numFrames,
      frame_rate: frameRate
    };

    if (imageUrl) {
      payload.image_url = imageUrl;
    }

    const response = await fetch(
      "https://apihub.agnes-ai.com/v1/videos",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Agnes a refusé la génération.",
        details: data
      });
    }

    const videoId = data.video_id || data.id;

    return res.status(200).json({
      success: true,
      video_id: videoId,
      provider: "agnes",
      model: "agnes-video-v2.0",
      status: data.status || "processing",
      raw: data
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la communication avec Agnes.",
      details: error.message
    });
  }
            }
