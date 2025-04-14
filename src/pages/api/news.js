// pages/api/news.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fd215b80f78a4a2983198435bb44670e`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
