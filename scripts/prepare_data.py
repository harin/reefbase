import reverse_geocode
import json

data = json.load(open('download.json'))

coords = [(d['lat'], d['lng']) for d in data['sites']]


geo = reverse_geocode.search(coords)
data_merge = []
for i, d in enumerate(data['sites']):
    z = {
        'name': d['name'],
        'lat': d['lat'],
        'lng': d['lng'],
        'country': geo[i]['country'],
        'city': geo[i]['city'],
        'country_code': geo[i]['country_code']
    }
    data_merge.append(z)


json.dump(data_merge, open('data_merge.json' ,'w'))