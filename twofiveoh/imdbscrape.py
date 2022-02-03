import csv
import logging
import json
import re
from imdb import IMDb

listloc = './list.csv'
extrasloc = './extras.csv'
ia = IMDb()
list = []
extras = dict()
episodes = []

logging.basicConfig(level=logging.INFO)

with open(listloc, newline='') as listfile:
    listreader = csv.reader(listfile)
    rowindex = 0
    for row in listreader:
        if rowindex == 0:
            rowindex += 1
            continue

        epindex = str(int(float(row[0]))).rjust(3, '0')
        if (float(row[0]) % 1) != 0:
            epindex = epindex + str(round(float(row[0]) % 1, 1))[1:]

        list.append(
            {
                "epindex": epindex,
                "listindex": row[1].lower(),
                "imdbid": row[2],
                "type": row[3].lower()
            }
        )

        rowindex += 1

with open(extrasloc, newline='') as extrasfile:
    extrasreader = csv.reader(extrasfile)
    rowindex = 0
    for row in extrasreader:
        if rowindex == 0:
            rowindex += 1
            continue

        extras[str(row[0])] = {
            "listindex": row[0].lower(),
            "coverurl": row[1],
            "title": row[2],
            "releasedate": row[3],
            "rating": row[4],
            "plotoutline": row[5]
        }

        rowindex += 1

# for ep in list:
print()

# the way im reading in ep is a little weird and it should probably some flavour
# of known class so that the linter can actually recognise it
for ep in list:
    if ep["type"] == 'a' or (ep["type"] == 'b' and ep["imdbid"] != None and ep["imdbid"] != ''):
        movie = ia.get_movie(ep["imdbid"])

        # some movies only have a year or a month and year, so try your best
        # to get the correct year
        if len(movie.get('original air date').split()) == 1:
            releasedate = movie.get('original air date').split()[0]
        elif len(movie.get('original air date').split()) == 2:
            releasedate = movie.get('original air date').split()[1]
        else:
            releasedate = movie.get('original air date').split()[2]

        coverurl = movie.get('cover url').replace(
            "101", "202").replace("150", "300")
        # coverurl = movie.get('cover url')

        e = {
            "epindex": ep["epindex"],
            "tfoindex": ep["listindex"],
            "imdbid": ep["imdbid"],
            "coverurl": coverurl,
            "title": movie.get('localized title'),
            "releasedate": releasedate,
            "rating": movie.get('rating'),
            "plotoutline": movie.get('plot outline')
        }
        # catch future bonus episodes where a film has not been selected
    elif ep["type"] == 'b':
        e = {
            "epindex": ep["epindex"],
            "tfoindex": ep["listindex"],
            "imdbid": "",
            "coverurl": "",
            "title": "upcoming bonus episode",
            "releasedate": "",
            "rating": "?",
            "plotoutline": ""
        }
    else:
        e = {
            "epindex": ep["epindex"],
            "tfoindex": ep["listindex"],
            "imdbid": "",
            # i am truly a terrible fucking programmer
            "coverurl": extras[ep["listindex"]]["coverurl"],
            "title": extras[ep["listindex"]]["title"],
            "releasedate": extras[ep["listindex"]]["releasedate"],
            "rating": extras[ep["listindex"]]["rating"],
            "plotoutline": extras[ep["listindex"]]["plotoutline"]
        }

    episodes.append(e)

# with open('./src/data/list.json', 'w') as outfile:
with open('./list.json', 'w') as outfile:
    json.dump(episodes, outfile, indent=2)
