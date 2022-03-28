from .models import Soda
from .serializers import SodaSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# function soda_list receives an HTTP request, GET or POST, and converts the data to the appropriate representation.
@api_view(['GET', 'POST'])
def soda_list(request):

    # For HTTP request GET, all 'Soda' objects are retreived and converted to JSON through the 'SodaSerializer'
    if request.method == 'GET':
        sodas = Soda.objects.all()
        serializer = SodaSerializer(sodas, many=True)
        return Response(serializer.data)

    # For HTTP request POST, all data sent with the request is serialized into a 'Soda' model object
    if request.method == 'POST':
        serializer = SodaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


#  function soda_info receives an HTTP request, GET, PUT, or POST, and converts the data to the appropriate representation
@api_view(['GET', 'PUT', 'DELETE'])
def soda_info(request, name):
    name = name.title()

    # Check for if the requested object exists
    try:
        soda = Soda.objects.get(name=name)
    except Soda.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # For HTTP request GET, the specific object, identified by the name, is retrieved and converted to JSON
    if request.method == 'GET':
        serializer = SodaSerializer(soda)
        return Response(serializer.data)

    # For HTTP request POST, all data sent with the request is serialized into a 'Soda' model object
    elif request.method == 'PUT':
        serializer = SodaSerializer(soda, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # For HTTP request DELETE, the identified 'Soda' model object is deleted
    elif request.method == 'DELETE':
        soda.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
