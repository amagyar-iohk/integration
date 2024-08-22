import { execSync } from "child_process";

export function cleanup() {
    execSync("rm -rf edge-agent")
}
