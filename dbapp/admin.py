from django.contrib import admin
from . models import BatteryData, AccelerometerData, GPSData
# Register your models here.

admin.site.register(BatteryData)
admin.site.register(AccelerometerData)
admin.site.register(GPSData)