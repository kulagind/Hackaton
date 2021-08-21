import uuid

from django.db import models
from django.contrib.postgres.fields import ArrayField


class Project(models.Model):
  guid = models.UUIDField(primary_key=True, db_index=True, default=uuid.uuid4)
  name = models.CharField(max_length=255, null=True)
  canvas = ArrayField(models.JSONField(null=True), default=None)

  class Meta:
    db_table = 'projects'
