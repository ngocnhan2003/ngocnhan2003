import sys
import json
import requests

url = 'https://www.instagram.com/graphql/query/?query_hash=3e7706b09c6184d5eafd8b032dbcf487&variables={"tag_name":"ngocnhan2003","first":0,"after":"%s"}'
end_cursor = ''
instacrawjson = sys.argv[1]
result = json.loads(open(instacrawjson, 'r').read() or '{}')
display_urls = result.values()


#link = 'https://www.instagram.com/p/'
changed = False

try:
    while True:
        res = requests.get(url % end_cursor)
        res.raise_for_status()
        data = res.json()
        edge_hashtag_to_media = data['data']['hashtag']['edge_hashtag_to_media']

        edges = edge_hashtag_to_media['edges']
        for edge in edges:
            shortcode = edge['node']['shortcode']
            display_url = edge['node']['display_url']
            if display_url not in display_url:
                result[shortcode] = display_url
                print('add: ' + shortcode)
                changed = True
        if edge_hashtag_to_media['page_info']['has_next_page']:
            end_cursor = edge_hashtag_to_media['page_info']['end_cursor']
        else:
            break
except:
    print('loaded')

if changed:
    open(instacrawjson, 'w').write(json.dumps(result))
print('done')