import { buildEdgeAgent, cloneEdgeAgent, testEdgeAgent, updateEdgeAgent } from "./edge-agent";
import { Variables } from "./environment";

/**
 * Triggers e2e test
 * 
 * @param component component to be tested
 * @param env sit | dev
 * @returns list of errors
 */
export async function test(variables: Variables): Promise< Map<string, Error>> {
    let errors:  Map<string, Error>  = new Map()

    if (variables.components.edgeAgent) {
        await cloneEdgeAgent()
        await buildEdgeAgent()
        try {
            await testEdgeAgent(variables.urls)
        } catch (e) {
            errors.set('edge-agent', e as Error)
        }
        return errors
    }

    // if (other-sdk) { ... }

    // test service
    await cloneEdgeAgent()
    await updateEdgeAgent()
    try {
        await testEdgeAgent(variables.urls)
    } catch (e) {
        errors.set('edge-agent', e as Error)
    }

    return errors
}