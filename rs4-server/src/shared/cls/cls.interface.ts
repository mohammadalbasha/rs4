import { Request } from "express";
import { ClsStore } from "nestjs-cls";

export interface MyClsStore extends ClsStore {
  req;
}
