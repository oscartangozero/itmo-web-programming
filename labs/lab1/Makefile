.PHONY: deploy clean-remote

DEPLOY_DIR="~/public_html/web/lab1"

deploy: 
	scp -r * "helios:$(DEPLOY_DIR)"

remote-clean:
	ssh helios rm -rf "$(DEPLOY_DIR)/*"