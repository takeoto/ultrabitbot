import cacheData from "memory-cache";

export default async function handler(req, res) {
    const url = 'https://api.glassnode.com/v1/metrics/indicators/sopr?' + new URLSearchParams({
        ...req.query,
        api_key: '2Gqyoj9HI03d1f3JM9cr552UoGD',
    });
    const value = cacheData.get(url);

    if (value) {
        res.status(value.code).json(value.data);
        return;
    }

    try {
        const result = await fetch(url);
        const response = await result.json();
        cacheData.put(url, {code: 200, data: response}, 24 * 1000 * 60 * 60)
        res.status(200).json(response);
    } catch (err) {
        const errorResponse = {error: err.toString()};
        cacheData.put(url, {code: 500, data: errorResponse}, 24 * 1000 * 60 * 60)
        res.status(500).json(errorResponse);
    }

}