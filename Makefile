run:
	sudo docker run -p 3000:3000 --network nestogram-network  --rm --env-file ${PWD}/environments/.env --name nestogram-api-app vuejs-nestogram/nestogram_api_image:latest
run-watch:
	docker run -p 3000:3000  --rm --net=host --env-file ${PWD}/environments/.env -v ${PWD}/src:/app/src --name nestogram-api-app vuejs-nestogram/nestogram_api_image:latest


stop:
	docker container rm nestogram-api-app --force
	docker container rm mongo_nestogram_api --force
	docker rmi mongo --force
	docker rmi vuejs-nestogram/nestogram_api_image:latest --force
	docker network rm nestogram-network --force

init:
	sudo docker volume create mongo_volume
	sudo mkdir -p /mongo_data_directory
	sudo docker pull mongo
	docker network create nestogram-network
	sudo docker run -p 27017:27017 -d --net=host -it -v /mongo_data_directory:/data/db --name mongo_nestogram_api mongo
	#docker network connect nestogram-network mongo_nestogram_api
	docker build -t vuejs-nestogram/nestogram_api_image .

build:
	npm run build