pm2 delete all

rm -rf ~/.config/idanode*
rm -rf ~/.config/witness*
rm -rf ~/.config/headless*
rm -rf ./witness*
rm -rf ./headless*

cp -r ./data/witness* ~/.config/
cp -r ./data/headless* ~/.config/
cp -r ./config-files/hub-conf.js ./idanode-hub/conf.js
cp -r ./config-files/witness-conf.js ./idanode-witness/conf.js
cp -r ./config-files/explorer-conf.js ./idanode-explorer/conf.js
cp -r ./config-files/witness-headless-start.js ./idanode-witness/node_modules/idanode-headless/start.js
cp -r ./config-files/witness-start.js ./idanode-witness/start.js
cp -r ./config-files/constants.js ./idanode-witness/node_modules/idanode-common/constants.js
cp -r ./config-files/constants.js ./idanode-headless/node_modules/idanode-common/constants.js
cp -r ./config-files/constants.js ./idanode-hub/node_modules/idanode-common/constants.js
cp -r ./config-files/constants.js ./idanode-explorer/node_modules/idanode-common/constants.js

for i in {1..12}
do
    echo  deploy witness$i
    cp -r  idanode-witness/ ./witness$i
    sed -i "s/idanode-witness/witness$i/g" ./witness$i/package.json
done

echo deploy finshed! run ./start.sh!
