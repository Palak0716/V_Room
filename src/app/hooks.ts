import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "./store";

export const useAppDispatch:() => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
