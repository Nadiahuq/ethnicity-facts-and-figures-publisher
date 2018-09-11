#!/bin/bash

# Symbolic links to git hooks need to be installed relative to the hooks directory to be resolved.
(cd .git/hooks; ln -sf ../../scripts/pre-commit pre-commit)
(cd .git/hooks; ln -sf ../../scripts/post-commit post-commit)
echo "RD_CMS hooks installed."
