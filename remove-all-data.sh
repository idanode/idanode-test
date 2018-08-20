pm2 delete all

rm ~/.config/idanode-hub/idanode*

for i in {13..15}
do
    rm  ~/.config/headless$i/idanode*
done

for i in {1..12}
do
    rm  ~/.config/witness$i/idanode*
done

echo All database has been deleted！
