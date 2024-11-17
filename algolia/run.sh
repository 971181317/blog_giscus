docker rm algolia
docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" --name algolia algolia/docsearch-scraper
docker rm algolia