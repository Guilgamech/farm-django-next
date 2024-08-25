import { TRol } from "./rol.schema"


export type TUserMe = {
  id: 2,
  email: "admin@gmail.com",
  rol: number
}
export type TUserMeResponse = {
  user: TUserMe
}
