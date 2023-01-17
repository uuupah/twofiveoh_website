# ~~twofiveohwebsite~~

~~indev version of the summary website for the twofiveoh podcast. compiled page is hosted on github pages; instead of running a backend the repository of podcast episodes is compiled by the twofiveoh team as a json file using [```./twofiveoh/imdbscrape.py```](https://github.com/uuupah/twofiveoh_website/blob/main/twofiveoh/imdbscrape.py). page is built in react with minimal imports.~~

# ~~todo~~
- [ ] ~~frontend~~
    - [x] ~~core layout~~
    - [ ] ~~whooshka embeds~~
    - [ ] ~~spotify / itunes links~~
    - [ ] ~~better breakpoints to improve narrow desktop experience~~
- [x] ~~"backend"~~
    - [x] ~~core data queried from imdb api~~
    - [x] ~~extra episode data~~

# fuck it! we're doing it properly this time
- [ ] spotify api using cloudflare wrangler
  - [ ] grab current state of podcast episodes (1 token request, 6 requests to get 50 * 6 episodes)
- [ ] whole new frontend using bootstrap so that im not pulling my own eyeballs out
  - [ ] new frontend uses as much space as possible with a poster-style interface
    - [ ] click through to full screen ish info about podcast
      - [ ] automatic updates of podcast info, new podcasts, spotify player in website
    - [ ] search
    - [ ] links to email, spotify, apple podcasts, instagram that dont look fucking ugly
  - [ ] frontend backend to wrangle api data
  - still hosting the frontend on github pages
