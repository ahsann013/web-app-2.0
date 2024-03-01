# Create your models here.

from django.db import models

class GPSData(models.Model):
    longitude = models.FloatField()
    latitude = models.FloatField()

class AccelerometerData(models.Model):
    x_parameter = models.FloatField()
    y_parameter = models.FloatField()
    z_parameter = models.FloatField()

class BatteryData(models.Model):
    single_cell_voltage = models.FloatField()
    num_battery_cells = models.IntegerField()
    mosfet_temperature = models.FloatField()
    box_temperature = models.FloatField()
    battery_temperature = models.FloatField()
    total_battery_voltage = models.FloatField()
    current_draw = models.FloatField()
    soc = models.FloatField()
    num_battery_cycles = models.IntegerField()
    battery_cycle_capacity = models.FloatField()
    battery_warning_messages = models.TextField()
    actual_battery_capacity = models.FloatField()



