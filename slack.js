await fetch(process.env.SLACK_WEBHOOK, {
    method: "POST",
    body: JSON.stringify({
        text: process.env.TEXT
    })
})
