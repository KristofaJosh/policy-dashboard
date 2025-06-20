export interface SSComponentProp<Params, SearchParams = undefined> {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}

export interface Recommendation {
  id: string
  title: string
  description: string
  riskScore: number
  riskClass: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  cloudProviders: string[]
  frameworks: Framework[]
  reasons: string[]
  impact: string
  resourcesEnforced: string[]
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export interface Framework {
  id: string
  name: string
  version?: string
}

export interface SearchFilters {
  frameworks: string[]
  cloudProviders: string[]
  classes: string[]
  reasons: string[]
}

export interface User {
  id: string
  username: string
  name: string
  role: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface ApiResponse<T> {
  data: T
  total: number
  page: number
  limit: number
  hasMore: boolean
}
