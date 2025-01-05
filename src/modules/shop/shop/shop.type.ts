import { Document } from "mongoose";
import { IDType } from "../../../types/requestResponse";

export interface ICreate extends Document {
  name: string;
}

// Update the interface to use IDType
export interface IUpdate {
  id: IDType;
  data: Partial<ICreate>;
}
