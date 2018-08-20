pm2 delete all

rm ~/.config/idanote-hub/idanote*

for i in {13..15}
do
    rm  ~/.config/headless$i/idanote*
done

for i in {1..12}
do
    rm  ~/.config/witness$i/idanote*
done

echo All database has been deleted！
