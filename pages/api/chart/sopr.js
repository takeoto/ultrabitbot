export default async function handler(req, res) {
    try {
        const result = await fetch(
            'https://api.glassnode.com/v1/metrics/indicators/sopr?' + new URLSearchParams({
                ...req.query,
                api_key: '2Gqyoj9HI03d1f3JM9cr552UoGD',
            })
        );
        const response = await result.json();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
}