import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

export const tmdb = axios.create({
    baseURL,
    params: {
        api_key: apiKey,
        language: "en-US",
    },
});

export const getImageUrl = (path, size = "w500") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "";


