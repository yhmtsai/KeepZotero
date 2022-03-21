all: Makefile.in

-include Makefile.in

RELEASE:=$(shell grep em:version install.rdf | head -n 1 | sed -e 's/ *<em:version>//' -e 's/<\/em:version>//')

keepzotero.xpi: FORCE
	rm -rf $@
	zip -r $@ chrome chrome.manifest defaults install.rdf -x \*.DS_Store

keepzotero-%-fx.xpi: keepzotero.xpi
	mv $< $@

Makefile.in: install.rdf
	echo "all: keepzotero-${RELEASE}-fx.xpi" > Makefile.in

FORCE:
