import re
import json
import requests


def refresh(url):
    try:
        requests.get(url).raise_for_status()
        print('OK: %s' % url)
        return 1
    except:
        print('ERROR: %s' % url)
        return 0


# jsdelivr
update_files = ['index.html']
for update_file in update_files:
    counter = 0
    links = re.findall('(https:\/\/cdn\.jsdelivr.+?(?=[>"]))', open(update_file, 'r').read())
    for link in links:
        counter += refresh(link)
    print('REFRESH %s: %d/%d' % (update_file, counter, len(links)))

# i2, ngocnhan2003
update_file = 'assets/files/instacraw.json'
counter = 0
instaids = json.loads(open(update_file, 'r').read()).get('tag_ngocnhan2003')
for instaid in instaids:
    counter += refresh('https://i2.wp.com/ngocnhan2003.github.io/assets/images/%s?w=400' % instaid)

print('REFRESH i2: %d/%d' % (counter, len(instaids)))
