from django.forms import SlugField
from django.http import JsonResponse
from .models import Soda
from .serializers import SodaSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET', 'POST'])
def soda_list(request):

    if request.method == 'GET':
        sodas = Soda.objects.all()
        serializer = SodaSerializer(sodas, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = SodaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def soda_info(request, name):
    name = name.title()

    try:
        soda = Soda.objects.get(name=name)
    except Soda.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SodaSerializer(soda)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = SodaSerializer(soda, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        soda.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
