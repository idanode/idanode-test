pm2 delete all

pm2 start  ./idanode-hub/start.js --name hub

for i in {1..12}
do
    pm2 start  ./witness$i/start.js --name witness$i
done

pm2 start  ./idanode-explorer/explorer.js --name explorer

echo deploy finshed
