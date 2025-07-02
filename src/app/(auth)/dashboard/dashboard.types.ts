interface Teams {
    _id: string
    name: string
    _idImg: string
    _idLeader: string
    members: string[]
    status: string
    description: string
}
interface Tournaments {
    name: string
    description: string
    _idImg: string
    typeSport: string
    _idUsers: string[]
    quotas: number
    teamSpace: number
    startDate: Date
    endDate: Date
    rounds: {
        nRound: string
        _idMatchs: string[]
        teamsWinners: string[]
        teamsMatches: string[]
        status: string
    }[]
    teams: string
}
export type { Teams,Tournaments }