interface MatchTeam {
  _idTeam: string;
  _idStream?: string;
  playersMembers: string[];
  score?: number;
}
interface Match {
  _id: string;
  _idTournament: string;
  teams: MatchTeam[];
  status: string;
  typeSport: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  _idTeamWinner: string | null; 
  initMatch:string;
  duration?: number; 
}

export type { Match, MatchTeam };
