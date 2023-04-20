import http from "lib/http";
import { ISign } from "../interface";

export const signin = (credentials: ISign) =>
    http.post("auth/signin", credentials);

export const signup = (credentials: ISign) =>
    http.post("auth/signup", credentials);
