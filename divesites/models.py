from django.contrib.gis.db import models
from django.contrib.postgres.fields import JSONField
# Create your models here.


class Location(models.Model):
    name = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    zoom_level = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    coord = models.PointField(srid=4326)

    class Meta:
        abstract = True



# CREATE TABLE country (
#   id INT PRIMARY KEY AUTO_INCREMENT,
#   coord POINT NOT NULL SRID 4326,
#   zoom_level FLOAT(4) DEFAULT 5,
#   name varchar(60)
# );
class Country(Location):
    zoom_level = models.IntegerField(default=5)


# CREATE TABLE destination (
#   id INTEGER PRIMARY KEY AUTO_INCREMENT,
#   name VARCHAR(100) NOT NULL,
#   country_id INT,
#   coord POINT NOT NULL SRID 4326,
#   zoom_level FLOAT(4) DEFAULT 11,
#   FOREIGN KEY (country_id) REFERENCES country (id)
# );
class City(Location):
    zoom_level = models.IntegerField(default=8)
    country = models.ForeignKey(Country, on_delete=models.CASCADE) 


# CREATE TABLE divesite (
#   id INTEGER PRIMARY KEY AUTO_INCREMENT,
#   name VARCHAR(100) NOT NULL,
#   destination_id INT NOT NULL,
#   coord POINT NOT NULL SRID 4326,
#   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#   updated_at TIMESTAMP,
#   FOREIGN KEY (destination_id) REFERENCES destination (id)
# );

class DiveSite(Location):
    zoom_level = models.IntegerField(default=11)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    max_temp = models.FloatField(null=True)
    min_temp = models.FloatField(null=True)
    max_temp_by_month = JSONField(null=True)
    min_temp_by_month = JSONField(null=True)
    meta = JSONField(null=True)

    def __str__(self):
        return f'{self.name} {self.id}'


# CREATE TABLE note (
#   id INT PRIMARY KEY AUTO_INCREMENT,
#   content TEXT NOT NULL,
#   divesite_id INT NOT NULL,
#   user_id INT NOT NULL,
#   FOREIGN KEY (divesite_id) REFERENCES divesite (id),
#   FOREIGN KEY (user_id) REFERENCES user (id),
#   UNIQUE(divesite_id, user_id)
# );

