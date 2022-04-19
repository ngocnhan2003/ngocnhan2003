
import sys


update_files = ['index.html']
repo = 'ngocnhan2003'
commit_count = sys.argv[1]
version_cdn = "https://cdn.jsdelivr.net/gh/ngocnhan2003/%s@v%s/assets/" % (repo, commit_count)

for update_file in update_files:
    index_html = open(update_file, 'r').read()
    open(update_file, 'w').write(index_html.replace('assets/', version_cdn))
