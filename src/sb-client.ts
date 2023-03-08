import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const sbUrl = process.env.VUE_APP_SUPABASE_URL || "";
const sbKey = process.env.VUE_APP_SUPABASE_KEY || "";

export const sbClient = createClient<Database>(sbUrl, sbKey);
