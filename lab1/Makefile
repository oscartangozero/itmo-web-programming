.PHONY: deploy clean-remote

DEPLOY_DIR := ~/public_html/web/lab1
DEPLOY_HOST := helios
DEPLOY_URL := https://se.ifmo.ru/~s263931/web/lab1/

deploy: 
	ssh $(DEPLOY_HOST) "mkdir -p $(DEPLOY_DIR)"
	scp -r * "$(DEPLOY_HOST):$(DEPLOY_DIR)"
	xdg-open $(DEPLOY_URL)

remote-clean:
	ssh $(DEPLOY_HOST) rm -rf $(DEPLOY_DIR)