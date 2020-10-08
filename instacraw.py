import sys
import json
import requests

craw_tag='ngocnhan2003'

url = 'https://www.instagram.com/graphql/query/?query_hash=3e7706b09c6184d5eafd8b032dbcf487&variables={"tag_name":"%s","first":0,"after":"%s"}'
end_cursor = ''
instacrawjson = sys.argv[1]
shortcodes = json.loads(open(instacrawjson, 'r').read() or '{}').get('tag_%s' % craw_tag, [])
result = []
changed = False
image_folder = 'assets/images/%s'
print('current post: %d' % len(shortcodes))

def download_image(shortcode, url_image):
    image = requests.get(url_image)
    with open(image_folder % shortcode, 'wb') as f:
        f.write(image.content)

try:
    while True:
        res = requests.get(url % (craw_tag, end_cursor))
        res.raise_for_status()
        edge_hashtag_to_media = res.json()['data']['hashtag']['edge_hashtag_to_media']
        edges = edge_hashtag_to_media['edges']
        print('tags found: %d' % len(edges))
        for edge in edges:
            shortcode = edge['node']['shortcode']
            display_url = edge['node']['display_url']
            if shortcode not in shortcodes:
                download_image(shortcode, display_url)
                print('add: ' + shortcode)
                changed = True
            result.append(shortcode)
        if edge_hashtag_to_media['page_info']['has_next_page']:
            end_cursor = edge_hashtag_to_media['page_info']['end_cursor']
        else:
            break
except:
    print('loaded')

if changed:
    print('write %d post to file: %s' % (len(result), instacrawjson))
    open(instacrawjson, 'w').write(json.dumps({'tag_%d' % craw_tag : result}))

print('done')
