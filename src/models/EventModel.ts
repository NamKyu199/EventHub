export interface EventModle {
    Date: number
    authorId: string
    descriptiont: string
    endAt: number
    imageUrl: string
    location: Location
    startAt: number
    title: string
    users: string[]
  }
  
  export interface Location {
    address: string
    title: string
  }