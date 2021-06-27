
import sys


update_files = ['index.html']
base_url = '/profile'
commit_count = sys.argv[1]
version_cdn = "https://cdn.jsdelivr.net/gh/ngocnhan2003/ngocnhan2003.github.io%s@v%s/assets/" % (base_url, commit_count)

for update_file in update_files:
    index_html = open(update_file, 'r').read()
    open(update_file, 'w').write(index_html.replace('assets/', version_cdn))
