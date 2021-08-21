import uuid

from django.db import models


class Project(models.Model):
  guid = models.UUIDField(primary_key=True, db_index=True, default=uuid.uuid4)
  name = models.CharField(max_length=255, null=True)
  canvas = models.JSONField(null=True)

  class Meta:
    db_table = 'projects'

