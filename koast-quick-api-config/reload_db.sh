for COLLECTION in tasks
do
  echo
  echo "# <$COLLECTION>"
  node_modules/koast/bin/koast reload --env=dev --col=$COLLECTION --src=server/data/$COLLECTION.json
done
