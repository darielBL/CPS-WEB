# Generated by Django 5.2.1 on 2025-05-27 22:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_rename_resource_type_resource_rtype'),
    ]

    operations = [
        migrations.RenameField(
            model_name='resource',
            old_name='rType',
            new_name='resource_type',
        ),
    ]
