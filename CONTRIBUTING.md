# Contributing

## Setting up the bot

1. Fork the repository and clone it to your workstation.
   1. If you'd like to get a tour of the codebase and a second pair of eyes during setup, snag a slot on [the calendar](https://calendly.com/vcarl/bots)
1. Create a `.env` file and copy the contents of `.env.example` into it.
1. Configure env variables
   1. Create a new Discord bot [in the developer portal](https://discord.com/developers/applications) and paste the token as `DISCORD_HASH`
   1. (optional) Request access token for Amplitude metrics from vcarl#7694 and paste the token as `AMPLITUDE_KEY`
1. Configure your Discord bot permissions
   1. Toggle off the "Public Bot" switch and save.
   1. Grant "Server members intent" permission
   1. Grant "Message content intent" permission
1. Go to the OAuth2 Tab and choose the "bot" scope.
1. `npm install`
1. `npm run dev`

## Environment variables

Adding a new environment variable needs to be done in several places to work corectly and be predictable for new developers:

- Add a suitable example to `.env.example`
- Add to your own `.env` (and restart the dev server)
- Add to the action in `.github/workflows/node.js.yml`
- Add to the Kubernetes config under `cluster/deployment.yml
