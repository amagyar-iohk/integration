import { execSync } from "child_process";
import { writeFileSync } from "fs"
import { edgeAgentAllureDir, edgeAgentGetVersion } from "./edge-agent";
import { Variables } from "./environment";

function buildOutputPath(variables: Variables): string {
    return `reports/${variables.components.actual}`
}

function generateEnvironmentFile(resultsDir: string, variables: Variables, edgeAgentVersion: string) {
    const envFilePath = `${resultsDir}/environment.properties`
    writeFileSync(envFilePath, `
        agent: ${variables.components.cloudAgent ? "dev": "sit"}
        mediator: ${variables.components.mediator ? "dev": "sit"}
        edge-agent: ${edgeAgentVersion}
    `)
}

export async function generateReports(variables: Variables) {
    const resultsDir = edgeAgentAllureDir()
    const edgeAgentVersion = edgeAgentGetVersion(variables)

    let output = buildOutputPath(variables)

    try {
        generateEnvironmentFile(resultsDir, variables, edgeAgentVersion)
        execSync(`cp -r ${output}/history ${resultsDir}`, { stdio: [] })
    } catch (e) {
    }

    execSync(`rm -rf ${output}`)
    execSync(`npx allure generate ${resultsDir} -o ${output} --name ${variables.components.actual}`)
}
