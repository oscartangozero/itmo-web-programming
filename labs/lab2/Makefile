.PHONY = build clean run-remote deplot-local deploy-remote

build: target/lab2.war

target/lab2.war: src/*
	mvn compile war:war

clean:
	mvn clean

debug:
	mvn wildfly:deploy

SERVER_PORT=44028
SERVER_DIR=~/wildfly-25.0.0.Final
SERVER_EXECUTABLE=$(SERVER_DIR)/bin/standalone.sh
DEPLOY_DIR=$(SERVER_DIR)/standalone/deployments/

deploy: target/lab2.war
	scp ./target/lab2.war "helios:$(DEPLOY_DIR)"