import axios from "axios";

const API_KEY = "a6097b97fdbc75a0eef97af9bdd1710d";
const BASE_URL =
  "https://v3.football.api-sports.io/fixtures?league=383&season=2023";

export type Team = {
  id: number;
  name: string;
  logo: string;
};

export type Fixture = {
  fixture: {
    id: number;
    date: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
};

export async function getUpcomingMatchesByTeam(
  teamName: string
): Promise<{ nextMatch: Fixture | null; allMatches: Fixture[] }> {
  const res = await axios.get(BASE_URL, {
    params: { league: 383, season: 2023, next: 20 },
    headers: { "x-apisports-key": API_KEY },
  });
  console.log(res.data);

  const allFixtures: Fixture[] = res.data.response;

  // סינון רק משחקי מכבי נתניה
  const netanyaFixtures = allFixtures.filter(
    (f) =>
      f.teams.home.name.includes(teamName) ||
      f.teams.away.name.includes(teamName)
  );

  return {
    nextMatch: netanyaFixtures[0] || null,
    allMatches: netanyaFixtures,
  };
}
