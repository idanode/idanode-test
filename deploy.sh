pm2 delete all

rm -rf ~/.config/idanote*
rm -rf ~/.config/witness*
rm -rf ~/.config/headless*
rm -rf ./witness*
rm -rf ./headless*

cp -r ./data/witness* ~/.config/
cp -r ./data/headless* ~/.config/
cp -r ./config-files/hub-conf.js ./idanote-hub/conf.js
cp -r ./config-files/witness-conf.js ./idanote-witness/conf.js
cp -r ./config-files/explorer-conf.js ./idanote-explorer/conf.js
cp -r ./config-files/witness-headless-start.js ./idanote-witness/node_modules/idanote-headless/start.js
cp -r ./config-files/witness-start.js ./idanote-witness/start.js
cp -r ./config-files/constants.js ./idanote-witness/node_modules/idanote-common/constants.js
cp -r ./config-files/constants.js ./idanote-headless/node_modules/idanote-common/constants.js
cp -r ./config-files/constants.js ./idanote-hub/node_modules/idanote-common/constants.js
cp -r ./config-files/constants.js ./idanote-explorer/node_modules/idanote-common/constants.js

for i in {1..12}
do
    echo  deploy witness$i
    cp -r  idanote-witness/ ./witness$i
    sed -i "s/idanote-witness/witness$i/g" ./witness$i/package.json
done

echo deploy finshed! run ./start.sh!
