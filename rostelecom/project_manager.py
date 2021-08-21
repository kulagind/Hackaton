from rostelecom.models import Project


class ProjectManager:
  def __init__(self):
    self.model = Project

  def get_all_project(self):
    instances = self.model.objects.all()
    result_list = []
    for instance in instances:
      result = {"uid": instance.guid,
                "name": instance.canvas,
                "canvas": instance.canvas}
      result_list.append({result})
    return result_list

  def create_project(self, params):
    data = {"name": params.get("name"),
            "canvas": params.get("canvas")}
    instance = self.model.objects.create(**data)
    result = {"uid": instance.guid,
              "name": instance.canvas,
              "canvas": instance.canvas}
    return result

  def get_project(self, guid):
    instance = self.model.objects.filter(guid=guid).first()
    result = {"uid": instance.guid,
              "name": instance.canvas,
              "canvas": instance.canvas}
    return result

  def update_project(self, params, guid):
    instance = self.model.objects.filter(guid=guid).first()
    name = params.get("name")
    canvas = params.get("canvas")
    if name:
      instance.name = name
    if canvas:
      instance.canvas = canvas
    instance.save()
    result = {"uid": instance.guid,
              "name": instance.canvas,
              "canvas": instance.canvas}
    return result

  def delete_project(self, guid):
    return self.model.objects.filter(guid=guid).delete()
