import { getVariables } from './environment'
import { cleanup } from './files'
import { generateReports } from './reports'
import { test } from './test'

export async function run(component: string, env: string) {
    cleanup()
    const variables = getVariables(component, env)
    let errors = await test(variables)
    await generateReports(variables)
    cleanup()

    if (errors.size > 0) {
        errors.forEach((v,k) => {
            console.error(k, v)
        })
        process.exit(1)
    }

    process.exit(0)
}
