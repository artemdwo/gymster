import { execSync } from "child_process";
import detect from "detect-port";

async function startSB() {
  const port = await detect(54321);
  if (port !== 54321) {
    return;
  }
  console.warn("Supabase is not running. Starting it now...");
  execSync("npx supabase start", { stdio: "inherit" });
}

function reseedDB() {
  execSync(
    "PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -p 54322 -f supabase/clear-db-data.sql",
    { stdio: "ignore" }
  );
}

export async function setupE2eTests() {
  await startSB();
  reseedDB();
}
