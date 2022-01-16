import csv
import logging
import json
import re
from imdb import IMDb

file = './list.csv'
ia = IMDb()
rowindex = 0
episodes = []

logging.basicConfig(level=logging.INFO)

with open(file, newline='') as csvfile:
    epreader = csv.reader(csvfile)
    for row in epreader:
        if rowindex == 0:
            rowindex += 1
            continue

        logging.info(f'processing film {row[0]}')

        # process the decimal episode index so it is three characters for a
        # normal episode (episode 36 is 036) and append a .5 for bonus episodes
        epindex = str(int(float(row[0]))).rjust(3, '0')
        if (float(row[0]) + 0.5) % 1 == 0:
            epindex = epindex + '.5'

        # catch future bonus episodes where a film has not been selected
        if row[2] == '' or row[2] is None:
            e = {
                "epindex": epindex,
                "tfoindex": row[1],
                "imdbid": "",
                "coverurl": "",
                "title": "upcoming bonus episode",
                "releasedate": "",
                "rating": "",
                "plotoutline": ""
            }
        else:
            movie = ia.get_movie(row[2])

            # some movies only have a year or a month and year, so try your best
            # to get the correct year
            if len(movie.get('original air date').split()) == 1:
                releasedate = movie.get('original air date').split()[0]
            elif len(movie.get('original air date').split()) == 2:
                releasedate = movie.get('original air date').split()[1]
            else:
                releasedate = movie.get('original air date').split()[2]

            coverurl = movie.get('cover url').replace("101","202").replace("150","300")
            # coverurl = movie.get('cover url')

            e = {
                "epindex": epindex,
                "tfoindex": row[1],
                "imdbid": row[2],
                "coverurl": coverurl,
                "title": movie.get('localized title'),
                "releasedate": releasedate,
                "rating": movie.get('rating'),
                "plotoutline": movie.get('plot outline')
            }

        episodes.append(e)
        rowindex += 1

        logging.info(f'finished querying film {row[0]}')


with open('./src/data/list.json', 'w') as outfile:
    json.dump(episodes, outfile, indent=2)
