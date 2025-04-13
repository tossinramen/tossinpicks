export const getOdds = async () => {
    const res = await fetch('http://127.0.0.1:8000/odds');
    if (!res.ok) throw new Error('Failed to fetch odds');
    return res.json();
}
