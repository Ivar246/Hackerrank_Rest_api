'use strict';

const axios = require("axios")
/*
 * Complete the 'getNumDraws' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER year as parameter.
 */

const url = 'https://jsonmock.hackerrank.com/api/'


async function getCount(year, i) {
    let count = 0;
    const res = await axios.get(url + "football_matches?year=" + year + "&page=" + i);
    const result = res.data;
    const data = result.data;

    if (Array.isArray(data)) {
        data.forEach(d => {
            if (d.team1goals === d.team2goals) {
                count++;
            }
        });
    }
    return count;
}

async function getNumDraws(year) {
    let total_draw = 0;
    const res = await axios.get(url + "football_matches?year=" + year);
    let totalPage = res.data.total_pages || 1;

    const promise_collections = []
    for (let i = 1; i <= totalPage; i++) {
        promise_collections.push(getCount(year, i));
    }

    const resolvedList = await Promise.all(promise_collections);
    resolvedList.forEach(c => total_draw += c);

    return total_draw;

}
