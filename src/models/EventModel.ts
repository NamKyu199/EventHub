export interface EventModle {
  findIndex(arg0: (id: any) => boolean): unknown
  _v: number
  _id: string
  authorId: string
  category: string
  createdAt: string
  description: string
  endAt: number
  locationAddress: string
  locationTitle: string
  photoUrl: string
  position: Position
  price: string
  date: number | Date;
  startAt: number
  title: string
  updatedAt: string
  users: string[]
  followers?: string[]
  authorIds: string,
  authorName: string,
  authorEmail: string
  authorPhotoUrl: string
}
export interface Position {
  _id: string
  lat: number
  long: number
}