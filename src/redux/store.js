import { configureStore } from "@reduxjs/toolkit";
import job from "./slices/JobSlices";

export default configureStore({reducer:{job}})