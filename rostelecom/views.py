from rest_framework.views import APIView, Response

from rostelecom.project_manager import ProjectManager


class ProjectView(APIView):

  def get(self):
    data = ProjectManager().get_all_project()
    return Response(status=200, data=data)

  def post(self, request):
    data = request.data
    result_data = ProjectManager().create_project(params=data)
    return Response(status=201, data=result_data)


class ProjectDetailView(APIView):
  def get(self, request, guid):
    print(guid)
    result_data = ProjectManager().get_project(guid=guid)
    print(result_data)
    return Response(status=200, data=result_data)

  def patch(self, request, guid):
    data = request.data
    ProjectManager().update_project(params=data, guid=guid)
    return Response(status=200)

  def delete(self, request, guid):
    ProjectManager().delete_project(guid=guid)
    return Response(status=204)
