#!/bin/sh

mongoexport --host 127.0.0.1:3001 --db meteor --collection cards > ../data/cards.json

echo "Crystal.cardList = " > ./client/cardList.js
mongoexport --host 127.0.0.1:3001 --db meteor --collection cards --jsonArray >> ./client/cardList.js
echo ";" >> ./client/cardList.js
