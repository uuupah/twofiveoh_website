# twofiveoh spotify api

a cloudflare worker that is basically just here to obfuscate my spotify dev key. grabs all of the json info for all of the twofiveoh podcast episodes and shoots them through to the client

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the workers script.

#### Wrangler

```ps1
# install wrangler cli
`npm install -g @cloudflare/wrangler
# generate project
wrangler generate twofiveoh-api
# link cloudflare account to cli
wrangler login
## respond with y
## link using browser
wrangler whoami
## grab account id and add to account_id in wrangler.toml
# publish api to cloudflare
wrangler publish
# make api available locally in dev mode
wrangler dev
```

```sh
## getting wrangler to behave on linux was a headache
## first, uninstall npm
# remove npm
sudo dnf remove npm
# install nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# install npm via nvm
nvm install node
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).
