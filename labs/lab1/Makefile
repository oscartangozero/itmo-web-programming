.PHONY: deploy clean-remote

deploy: 
	scp -r * "helios:~/public_html"

remote-clean:
	ssh helios rm -rf "~/public_html/*"