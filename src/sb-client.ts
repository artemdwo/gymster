import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const sbUrl = (import.meta as any).env.VITE_SUPABASE_API_URL || "";
const sbKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || "";

export const sbClient = createClient<Database>(sbUrl, sbKey);
