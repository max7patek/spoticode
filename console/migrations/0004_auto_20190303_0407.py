# Generated by Django 2.1.7 on 2019-03-03 04:07

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('console', '0003_savedprogram_script'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='savedprogram',
            unique_together={('user', 'name')},
        ),
    ]
