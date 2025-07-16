interface Teams {
  _id: string;
  name: string;
  _idImg: string;
  _idLeader: string;
  members: string[];
  createdDate: string;
  status: string;
  description: string;
}
interface Tournaments {
  _id: string;
  _idReferee: string;
  name: string;
  description: string;
  _idImg: string;
  typeSport: string;
  _idPayDetails:string;
  _idUsers: string[];
  quotas: number;
  amount: number;
  teamSpace: number;
  startDate: Date;
  endDate: Date;
  status: string;
  rounds: Rounds[];
  teams: TourTeams[];
}
interface TourTeams {
  _id: string;
  _idTeam: string;
  status: string;
  playersMembers: string[];
  _idLeader: string;
}
interface Rounds {
  nRound: string;
  _idMatchs: string[];
  teamsWinners: string[];
  teamsMatchs: string[];
  status: string;
}
interface Dashboard {
  teams: Teams[] | null;
  myTournaments: Tournaments[] | null;
  registeredTour: Tournaments[] | null;
  getTeams: () => any;
  getMyTournaments: () => any;
  getRegisteredTour: () => any;
}
export type { Teams, Tournaments, Dashboard, Rounds, TourTeams };
