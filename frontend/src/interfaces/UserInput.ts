import { ChangeEvent } from "react";

export interface UserInput {
    value:any,
    handleChange:(event:ChangeEvent<HTMLInputElement>)=>void
  }