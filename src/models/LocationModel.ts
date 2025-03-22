export interface LocationModel {
  id: string
  address: any
  items: Item[]
}

export interface Item {
  title: string
  id: string
  language: string
  resultType: string
  administrativeAreaType?: string
  address: Address
  highlights: Highlights
  localityType?: string
}

export interface Address {
  label: string
  countryCode: string
  countryName: string
  county: string
  city?: string
  postalCode?: string
  district?: string
}

export interface Highlights {
  title: Title[]
  address: Address2
}

export interface Title {
  start: number
  end: number
}

export interface Address2 {
  label: Label[]
  county?: County[]
  city?: City[]
  district?: District[]
}

export interface Label {
  start: number
  end: number
}

export interface County {
  start: number
  end: number
}

export interface City {
  start: number
  end: number
}

export interface District {
  start: number
  end: number
}
