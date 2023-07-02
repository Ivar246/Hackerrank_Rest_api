/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */
const axios = require('axios')

async function getTotalGoals(team, year) {
    let total_goal = 0;
    const url = "https://jsonmock.hackerrank.com/api/";
    let res = await axios.get(url + "football_matches?year=" + year + "&team1=" + team);
    let result = res.data;
    let total_pages = result.total_pages || 1;
    for (let i = 1; i <= total_pages; i++) {
        const res = await axios.get(url + "football_matches?year=" + year + "&team1=" + team + "&page=" + i);
        const result = res.data;
        const football_data = result.data;
        if (Array.isArray(football_data)) {
            football_data.forEach(d => {
                total_goal += Number(d.team1goals);
            });
        }
    }

    res = await axios.get(url + "football_matches?year=" + year + "&team2=" + team);
    result = res.data;
    total_pages = result.total_pages || 1;
    for (let i = 1; i <= total_pages; i++) {
        const res = await axios.get(url + "football_matches?year=" + year + "&team2=" + team + "&page=" + i);
        const result = res.data;
        const football_data = result.data;
        if (Array.isArray(football_data)) {
            football_data.forEach(d => {
                total_goal += Number(d.team2goals);
            });
        }
    }
    return total_goal;
}
