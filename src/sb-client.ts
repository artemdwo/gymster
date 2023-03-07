import {createClient} from "@supabase/supabase-js"

const sbUrl = process.env.VUE_APP_SUPABASE_URL || ''
const sbKey = process.env.VUE_APP_SUPABASE_KEY || ''

export const sbClient = createClient(sbUrl, sbKey)