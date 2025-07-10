interface Teams {
  _id: string;
  name: string;
  _idImg: string;
  _idLeader: string;
  members: string[];
  createdDate:string;
  status: string;
  description: string;
}
interface Tournaments {
  _id: string,
  name: string;
  description: string;
  _idImg: string;
  typeSport: string;
  _idUsers: string[];
  quotas: number;
  teamSpace: number;
  startDate: Date;
  endDate: Date;
  status: string;
  rounds: {
    nRound: string;
    _idMatchs: string[];
    teamsWinners: string[];
    teamsMatchs: string[];
    status: string;
  }[];
  teams: {
    _id: string;
    _idTeam: string;
    status: string;
    playersMembers: string[];
    _idLeader: string;
  }[];
}
interface Dashboard {
  teams: Teams[] | null;
  myTournaments: Tournaments[] | null;
  registeredTour: Tournaments[] | null;
  getTeams: () => any;
  getMyTournaments: () => any;
  getRegisteredTour: () => any;
}
export type { Teams, Tournaments, Dashboard };
