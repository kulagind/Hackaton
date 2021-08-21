# Generated by Django 3.2.6 on 2021-08-20 20:40

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('guid', models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, null=True)),
                ('canvas', models.JSONField(null=True)),
            ],
            options={
                'db_table': 'projects',
            },
        ),
    ]