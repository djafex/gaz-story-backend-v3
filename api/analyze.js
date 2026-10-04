export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Méthode non autorisée."
    });
  }

  try {
    const { title, story, duration, style, format, language } = req.body || {};

    if (!story || !story.trim()) {
      return res.status(400).json({
        error: "L'histoire est obligatoire."
      });
    }

    const scenes = [
      {
        number: 1,
        title: "Introduction",
        description: "Présentation de l'univers et du personnage principal.",
        duration: "10-30 secondes"
      },
      {
        number: 2,
        title: "Événement déclencheur",
        description: "Un événement vient modifier la situation initiale.",
        duration: "10-30 secondes"
      },
      {
        number: 3,
        title: "Développement",
        description: "Le personnage poursuit son objectif et rencontre des obstacles.",
        duration: "20-60 secondes"
      },
      {
        number: 4,
        title: "Moment clé",
        description: "L'histoire atteint un moment important.",
        duration: "20-60 secondes"
      },
      {
        number: 5,
        title: "Conclusion",
        description: "Résolution et conclusion de l'histoire.",
        duration: "10-30 secondes"
      }
    ];

    return res.status(200).json({
      success: true,
      project: {
        title: title || "Mon histoire",
        duration: duration || "1 minute",
        style: style || "Cinématique réaliste",
        format: format || "16:9",
        language: language || "Français"
      },
      analysis: {
        characters: [],
        locations: [],
        era: "",
        atmosphere: [],
        objects: [],
        events: [],
        dialogues: [],
        chronology: []
      },
      storyboard: scenes,
      provider: "pending"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erreur interne du serveur."
    });
  }
                      }
