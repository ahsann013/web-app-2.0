# Generated by Django 5.0.2 on 2024-02-24 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccelerometerData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x_parameter', models.FloatField()),
                ('y_parameter', models.FloatField()),
                ('z_parameter', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='BatteryData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('single_cell_voltage', models.FloatField()),
                ('num_battery_cells', models.IntegerField()),
                ('mosfet_temperature', models.FloatField()),
                ('box_temperature', models.FloatField()),
                ('battery_temperature', models.FloatField()),
                ('total_battery_voltage', models.FloatField()),
                ('current_draw', models.FloatField()),
                ('soc', models.FloatField()),
                ('num_battery_cycles', models.IntegerField()),
                ('battery_cycle_capacity', models.FloatField()),
                ('battery_warning_messages', models.TextField()),
                ('actual_battery_capacity', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='GPSData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
            ],
        ),
        migrations.DeleteModel(
            name='Username',
        ),
    ]
