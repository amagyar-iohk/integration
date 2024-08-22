import { exec, execSync } from "child_process";
import { Urls, Variables } from "./environment";

export function edgeAgentAllureDir(): string {
    return "./edge-agent/integration/allure-results"
}

export function edgeAgentGetVersion(variables: Variables): string {
    if (variables.components.edgeAgent) {
        return "local build"
    }
    const version = execSync("npm --prefix edge-agent/integration view @amagyar-iohk/edge-agent version")
    return version.toString()
}

export async function cloneEdgeAgent() {
    execSync("git clone https://github.com/amagyar-iohk/edge-agent.git")
}

export async function buildEdgeAgent() {
    execSync("npm --prefix edge-agent ci", { stdio: [] })
    execSync("npm --prefix edge-agent run build", { stdio: [] })
}

export async function updateEdgeAgent() {
    execSync("npm --prefix edge-agent/integration i @amagyar-iohk/edge-agent@latest", { stdio: [] })
}

export async function testEdgeAgent(urls: Urls): Promise<{ stdout: string; stderr: string }> {
    execSync("npm --prefix edge-agent/integration ci", { stdio: [] })

    return new Promise((resolve, reject) => {
        exec('npm --prefix edge-agent/integration run e2e', {
            env: { ...process.env, AGENT_URL: urls.agent, MEDIATOR_URL: urls.mediator }
        }, (error, stdout, stderr) => {
            if (error) {
                reject(error)
            } else {
                console.log("edge-agent success")
                resolve({ stdout, stderr })
            }
        });
    })
}
