from django.shortcuts import render
from rest_framework.views import APIView 
from list.models import Task
from rest_framework.response import Response

# Create your views here.

class TaskView(APIView):
    def post(self, request):
        try:
            title = request.data.get('title')
            if title == '':
                return Response({
                'status': 400,
                'message' : "Title cannot be null"
            })
            new_task = Task.objects.create(title = title)
            new_task.save()
            return Response({
                'status': 201,
                'message' : 'New Task added succcessfully'
            })
        except Exception as e: 
            return Response({
                'status': 500,
                'message' : str(e)
            })
    
    def get(self, request):
        try:
            task_list = Task.objects.all()

            task_list_values = list(task_list.values())
            return Response({
                "status" : 200,
                "message" : "success",
                "task" : task_list_values
            })
        except Exception as e: 
            return Response({
                'status': 500,
                'error' : str(e)
            })

