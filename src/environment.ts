import { config } from "dotenv"

export class Urls {
    agent: string
    mediator: string

    constructor(component: string, environment: string) {
        let agent: string = process.env['SIT_AGENT_URL']!
        let mediator: string = process.env['SIT_MEDIATOR_URL']!

        if (component == 'cloud-agent') {
            agent = process.env[`${environment.toUpperCase()}_AGENT_URL`]!
        }

        if (component == 'mediator') {
            mediator = process.env[`${environment.toUpperCase()}_MEDIATOR_URL`]!
        }

        this.agent = agent
        this.mediator = mediator
    }
}

export class Components {
    actual: string
    cloudAgent: boolean
    mediator: boolean
    edgeAgent: boolean

    constructor(component: string) {
        let cloudAgent = false
        let mediator = false
        let edgeAgent = false

        switch (component) {
            case 'cloud-agent': {
                cloudAgent = true
                break
            }
            case 'mediator': {
                mediator = true
                break
            }
            case 'edge-agent': {
                edgeAgent = true
                break
            }
        }

        this.actual = component
        this.cloudAgent = cloudAgent
        this.mediator = mediator
        this.edgeAgent = edgeAgent
    }
}

export class Variables {
    urls: Urls
    components: Components
    environment: string

    constructor(component: string, environment: string) {
        this.environment = environment
        this.urls = new Urls(component, environment)
        this.components = new Components(component)
    }
}

export function getVariables(component: string, environment: string): Variables {
    config()
    const variables = new Variables(component, environment)
    console.info("Environment", variables)
    return variables
}